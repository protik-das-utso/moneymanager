package dev.protik.moneymanager.repository;

import dev.protik.moneymanager.entity.ProfileEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ProfileRepository extends JpaRepository<ProfileEntity, Long> {
    // Select * from tbl_profiles where email = ?
    Optional<ProfileEntity> findByEmail(String email);
    Boolean existsByEmail(String email);
    Optional<ProfileEntity> findByActivationToken(String activationToken);
    Optional<ProfileEntity> findByPasswordResetToken(String passwordResetToken);

    @Modifying
    @Query("update ProfileEntity p set p.password = :password, p.passwordResetToken = null where p.id = :id")
    int updatePasswordById(@Param("id") Long id, @Param("password") String password);
}
