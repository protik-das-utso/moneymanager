package dev.protik.moneymanager.controller;

import dev.protik.moneymanager.dto.AuthDTO;
import dev.protik.moneymanager.dto.ProfileDTO;
import dev.protik.moneymanager.entity.ProfileEntity;
import dev.protik.moneymanager.exception.EmailAlreadyUsedException;
import dev.protik.moneymanager.repository.ProfileRepository;
import dev.protik.moneymanager.service.ProfileService;
import dev.protik.moneymanager.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileService profileService;
    private final ProfileRepository profileRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/register")
    public ResponseEntity<?> registerProfile(@RequestBody ProfileDTO profileDTO) {
        try {
            ProfileDTO registeredProfile = profileService.registerProfile(profileDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(registeredProfile);
        } catch (EmailAlreadyUsedException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Email already in use", "message", e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("error", "Registration failed", "message", e.getMessage()));
        }
    }
    @GetMapping("/activate")
    public ResponseEntity<String> activateProfile(@RequestParam String token) {
        boolean isActivated = profileService.activateProfile(token);
        if (!isActivated) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid activation token.");
        } else{
            return ResponseEntity.ok("Profile activated successfully.");
        }
    }
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody AuthDTO authDTO) {
        try{
            Optional<ProfileEntity> userOpt = profileRepository.findByEmail(authDTO.getEmail());
            if (userOpt.isEmpty()) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "No account found with this email"));
            }

            ProfileEntity user = userOpt.get();

            // 1) Verify password
            if (!passwordEncoder.matches(authDTO.getPassword(), user.getPassword())) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                        .body(Map.of("error", "Invalid email or password"));
            }

            // 2) Check activation status
            if (!profileService.isAccountActive(authDTO.getEmail())) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN)
                        .body(Map.of("message", "Account is not activated. Please activate your account."));
            }

            // 3) Generate JWT token directly (avoid double authentication)
            String token = jwtUtil.generateToken(authDTO.getEmail());
            ProfileDTO userDTO = profileService.toDTO(user);
            userDTO.setPassword(null); // Exclude password from response
            return ResponseEntity.ok(Map.of(
                    "token", token,
                    "user", userDTO
            ));

        } catch (Exception e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        }
    }


}
