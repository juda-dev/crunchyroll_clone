package dev.juda.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.Instant;
import java.util.Objects;
import java.util.Set;
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
    @JsonIgnore
    private String posterUuid;

    @Column(name = "banner_uuid")
    @JsonIgnore
    private String bannerUuid;

    @ManyToMany(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "anime_categories",
            joinColumns = @JoinColumn(name = "anime_id"),
            inverseJoinColumns = @JoinColumn(name = "category_id"),
            uniqueConstraints = @UniqueConstraint(columnNames = {"anime_id", "category_id"})
    )
    private Set<CategoryEntity> categories;

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

    @JsonProperty("poster")
    public String getPoster() {
        if (posterUuid != null && !posterUuid.isEmpty()) {
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
            return baseUrl + "/images/animes/posters/" + posterUuid;
        }
        return null;
    }

    @JsonProperty("banner")
    public String getBanner() {
        if (bannerUuid != null && !bannerUuid.isEmpty()) {
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
            return baseUrl + "/images/animes/banners/" + bannerUuid;
        }
        return null;
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

    public Set<CategoryEntity> getCategories() {
        return categories;
    }

    public void setCategories(Set<CategoryEntity> categories) {
        this.categories = categories;
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
