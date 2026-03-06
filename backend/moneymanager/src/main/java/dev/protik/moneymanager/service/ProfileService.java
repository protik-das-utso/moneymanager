package dev.protik.moneymanager.service;

import dev.protik.moneymanager.dto.AuthDTO;
import dev.protik.moneymanager.dto.ProfileDTO;
import dev.protik.moneymanager.entity.ProfileEntity;
import dev.protik.moneymanager.exception.EmailAlreadyUsedException;
import dev.protik.moneymanager.repository.ProfileRepository;
import dev.protik.moneymanager.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProfileService {

    private static final Logger log = LoggerFactory.getLogger(ProfileService.class);

    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public ProfileDTO registerProfile(ProfileDTO profileDTO) {

        if (profileRepository.existsByEmail(profileDTO.getEmail())) {
            throw new EmailAlreadyUsedException();
        }
        ProfileEntity newProfile = toEntity(profileDTO);

        // encode password once before saving
        newProfile.setPassword(passwordEncoder.encode(newProfile.getPassword()));
        log.info("Password has been securely hashed for user: {}", newProfile.getEmail()); // Avoid logging raw passwords
        newProfile.setActivationToken(UUID.randomUUID().toString());
        newProfile = profileRepository.save(newProfile);

        return toDTO(newProfile);

    }

    // DTO to Entity
    public ProfileEntity toEntity(ProfileDTO profileDTO) {
        return ProfileEntity.builder()
                .id(profileDTO.getId())
                .fullName(profileDTO.getFullName())
                .email(profileDTO.getEmail())
                // store raw password here; encoding will be handled by registerProfile to avoid double-encoding
                .password(profileDTO.getPassword())
                .profileImageUrl(profileDTO.getProfileImageUrl())
                .createdAt(profileDTO.getCreatedAt())
                .updatedAt(profileDTO.getUpdatedAt())
                .build();
    }

    public ProfileDTO toDTO(ProfileEntity profileEntity) {
        return ProfileDTO.builder()
                .id(profileEntity.getId())
                .fullName(profileEntity.getFullName())
                .email(profileEntity.getEmail())
                .profileImageUrl(profileEntity.getProfileImageUrl())
                .createdAt(profileEntity.getCreatedAt())
                .updatedAt(profileEntity.getUpdatedAt())
                .build();
    }

    public boolean activateProfile(String activationToken) {
        return profileRepository.findByActivationToken(activationToken)
                .map(profile -> {
                    profile.setIsActive(true);
                    profileRepository.save(profile);
                    return true;
                }).orElse(false);

    }

    public boolean isAccountActive(String email) {
        return profileRepository.findByEmail(email)
                .map(ProfileEntity::getIsActive)
                .orElse(false);
    }

    public ProfileEntity getCurrentProfile() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // Check if user is authenticated (not anonymous)
        if (authentication == null || !authentication.isAuthenticated() ||
            "anonymousUser".equals(authentication.getName())) {
            log.warn("Attempted to get current profile for unauthenticated user");
            throw new UsernameNotFoundException("User is not authenticated");
        }

        String email = authentication.getName();
        return profileRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + email));
    }

    public ProfileDTO getPublicProfile(String email) {
        ProfileEntity currentUser;
        if (email == null) {
            currentUser = getCurrentProfile();
        } else {
            currentUser = profileRepository.findByEmail(email)
                    .orElseThrow(() -> new UsernameNotFoundException("Profile not found with email: " + email));
        }
        return toDTO(currentUser);
    }


    public Map<String, Object> authenticateAndGenerateToken(AuthDTO authDTO) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authDTO.getEmail(),
                            authDTO.getPassword()
                    )
            );
            // Generate JWT token
            String token = jwtUtil.generateToken(authDTO.getEmail());
            return Map.of(
                    "token", token,
                    "user", getPublicProfile(authDTO.getEmail())
            );
        } catch (Exception e) {
            log.error("Authentication failed for user {}: {}", authDTO.getEmail(), e.getMessage());
            throw new RuntimeException("Invalid email or password");
        }
    }

    // Initiate password reset: generate token and save to profile
    public void initiatePasswordReset(String email) {
        profileRepository.findByEmail(email).ifPresent(profile -> {
            String token = UUID.randomUUID().toString();
            profile.setPasswordResetToken(token);
            profileRepository.save(profile);

            // TODO: send email containing reset link (e.g., /password/reset/confirm?token=...)
            log.info("Password reset token generated for {}: {}", email, token);
        });
    }

    // Reset the password using token
    @Transactional
    public boolean resetPassword(String token, String newPassword) {
        return profileRepository.findByPasswordResetToken(token)
                .map(profile -> {
                    boolean newPasswordNull = (newPassword == null || newPassword.trim().isEmpty());
                    log.info("resetPassword called for profile id={} newPasswordNull={}", profile.getId(), newPasswordNull);

                    if (newPasswordNull) {
                        log.warn("Attempted to reset password with empty/newPassword for profile id={}", profile.getId());
                        return false;
                    }

                    String encoded = null;
                    try {
                        encoded = passwordEncoder.encode(newPassword);
                    } catch (Exception e) {
                        log.error("Password encoding failed: {}", e.getMessage(), e);
                        return false;
                    }

                    // Log only hash metadata (length/prefix) not the full hash for security
                    if (encoded != null) {
                        String prefix = encoded.length() > 6 ? encoded.substring(0, 6) : encoded;
                        log.info("Encoded password hash length={} prefix={}", encoded.length(), prefix);
                    } else {
                        log.warn("Encoded password is null for profile id={}", profile.getId());
                    }

                    profile.setPassword(encoded);
                    profile.setPasswordResetToken(null);

                    // Persist password and clear token using a direct update to avoid JPA dirty-check issues
                    int rowsUpdated = profileRepository.updatePasswordById(profile.getId(), encoded);
                    log.info("updatePasswordById rowsUpdated={}", rowsUpdated);

                    // reload to verify persisted value
                    ProfileEntity reloadedAfterUpdate = profileRepository.findById(profile.getId()).orElse(null);
                    if (reloadedAfterUpdate != null) {
                        log.info("After update - stored password present={}, stored token={}",
                                reloadedAfterUpdate.getPassword() != null, reloadedAfterUpdate.getPasswordResetToken());
                    } else {
                        log.warn("After update - could not reload profile id={}", profile.getId());
                    }

                    return reloadedAfterUpdate != null && reloadedAfterUpdate.getPassword() != null;
                }).orElse(false);
    }
}
