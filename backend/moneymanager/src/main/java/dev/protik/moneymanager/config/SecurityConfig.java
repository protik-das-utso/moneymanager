package dev.protik.moneymanager.config;

import dev.protik.moneymanager.security.JwtRequestFilter;
import dev.protik.moneymanager.service.AppUserDetailsService;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;


@Configuration
@RequiredArgsConstructor
public class SecurityConfig {

    private final AppUserDetailsService appUserDetailsService;
    private final JwtRequestFilter jwtRequestFilter;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) {

        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(csrf -> csrf.disable()) // Reverted to lambda expression to fix unresolved symbol

                .authorizeHttpRequests(auth -> auth
                        // Public endpoints - no authentication required
                        .requestMatchers("/register").permitAll()
                        .requestMatchers("/activate").permitAll()
                        .requestMatchers("/activation").permitAll()
                        .requestMatchers("/login").permitAll()
                        .requestMatchers("/status").permitAll()
                        .requestMatchers("/health").permitAll()
                        .requestMatchers("/css/**", "/js/**", "/images/**").permitAll()
                        .requestMatchers("/password/reset/request").permitAll()
                        .requestMatchers("/password/reset/confirm").permitAll()

                        // All other endpoints require authentication
                        .anyRequest().authenticated()
                )

                // Exception handling - return JSON for API requests, redirect for page requests
                .exceptionHandling(exception -> exception
                        .authenticationEntryPoint((request, response, authException) -> {
                            // Check if it's an API request (JSON) or a page request (HTML)
                            String acceptHeader = request.getHeader("Accept");
                            String contentType = request.getHeader("Content-Type");

                            // If it's an API request (has JSON headers), return 401 JSON
                            if ((acceptHeader != null && acceptHeader.contains("application/json")) ||
                                (contentType != null && contentType.contains("application/json"))) {
                                response.setStatus(401);
                                response.setContentType("application/json");
                                response.getWriter().write("{\"error\":\"Unauthorized\",\"message\":\"Please login to access this resource\"}");
                            } else {
                                // For page requests, return 401 instead of redirect to avoid loops
                                response.setStatus(401);
                                response.setContentType("application/json");
                                response.getWriter().write("{\"error\":\"Unauthorized\",\"message\":\"Authentication required\"}");
                            }
                        })
                )

                // Stateless session (API best practice)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtRequestFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Specify exact origins instead of "*" when using credentials
        configuration.setAllowedOrigins(java.util.List.of(
                "http://localhost:5173",
                "http://localhost:3000"  // Add other dev ports if needed
        ));

        configuration.setAllowedMethods(java.util.List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        configuration.setMaxAge(3600L); // Cache preflight for 1 hour


        configuration.setAllowedHeaders(java.util.List.of(
                "Authorization",
                "Content-Type",
                "Accept",
                "Origin",
                "X-Requested-With",
                "Cache-Control",
                "Pragma"
        ));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public AuthenticationManager authenticationManager() {
        // Use the constructor that accepts a UserDetailsService (newer Spring Security)
        DaoAuthenticationProvider authenticationProvider = new DaoAuthenticationProvider(appUserDetailsService);
        authenticationProvider.setPasswordEncoder(passwordEncoder());
        return new ProviderManager(authenticationProvider);
    }
}
