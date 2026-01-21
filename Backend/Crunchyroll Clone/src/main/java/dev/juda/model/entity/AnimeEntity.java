package dev.juda.model.entity;

import jakarta.persistence.*;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "animes")
public class AnimeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String description;

    @Column(name = "poster_uuid")
    private String posterUuid;

    @Column(name = "banner_uuid")
    private String bannerUuid;

    @Column(updatable = false, nullable = false, name = "created_at")
    private Instant createdAt;

    @Column(nullable = true, name = "updated_at")
    private Instant updatedAt;

    @PrePersist
    private void prePersist() {
        this.createdAt = Instant.now();
    }

    @PreUpdate
    private void preUpdate() {
        this.updatedAt = Instant.now();
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getPosterUuid() {
        return posterUuid;
    }

    public void setPosterUuid(String posterUuid) {
        this.posterUuid = posterUuid;
    }

    public String getBannerUuid() {
        return bannerUuid;
    }

    public void setBannerUuid(String bannerUuid) {
        this.bannerUuid = bannerUuid;
    }

    public Instant getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Instant createdAt) {
        this.createdAt = createdAt;
    }

    public Instant getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(Instant updatedAt) {
        this.updatedAt = updatedAt;
    }

    @Override
    public boolean equals(Object o) {
        if (o == null || getClass() != o.getClass()) return false;
        AnimeEntity that = (AnimeEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
