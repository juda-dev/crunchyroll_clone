package dev.juda.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import dev.juda.util.ApiPaths;
import jakarta.persistence.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.time.Instant;
import java.util.Objects;
import java.util.UUID;

@Entity
@Table(name = "video_metadata")
public class VideoEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private Integer duration;

    @Column(nullable = false)
    private Boolean published;

    @Column(name = "src_uuid")
    @JsonIgnore
    private String srcUuid;

    @Column(name = "poster_uuid")
    @JsonIgnore
    private String posterUuid;

    @ManyToOne(fetch = FetchType.EAGER, cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinColumn(name = "anime_id", nullable = false)
    private AnimeEntity anime;

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

    @JsonProperty("src")
    public String getSrc() {
        if (srcUuid != null && !srcUuid.isEmpty()) {
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
            return baseUrl + ApiPaths.VIDEO_SOURCES + srcUuid;
        }
        return null;
    }

    @JsonProperty("poster")
    public String getPoster() {
        if (posterUuid != null && !posterUuid.isEmpty()) {
            String baseUrl = ServletUriComponentsBuilder.fromCurrentContextPath().toUriString();
            return baseUrl + ApiPaths.VIDEO_POSTERS + posterUuid;
        }
        return null;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getDuration() {
        return duration;
    }

    public void setDuration(Integer duration) {
        this.duration = duration;
    }

    public Boolean getPublished() {
        return published;
    }

    public void setPublished(Boolean published) {
        this.published = published;
    }

    public String getSrcUuid() {
        return srcUuid;
    }

    public void setSrcUuid(String srcUuid) {
        this.srcUuid = srcUuid;
    }

    public String getPosterUuid() {
        return posterUuid;
    }

    public void setPosterUuid(String posterUuid) {
        this.posterUuid = posterUuid;
    }

    public AnimeEntity getAnime() {
        return anime;
    }

    public void setAnime(AnimeEntity anime) {
        this.anime = anime;
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
        VideoEntity that = (VideoEntity) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }
}
