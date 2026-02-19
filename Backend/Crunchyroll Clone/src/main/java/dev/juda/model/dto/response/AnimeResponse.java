package dev.juda.model.dto.response;

import java.time.Instant;
import java.util.List;

public record AnimeResponse(String id,
                            String name,
                            String description,
                            String poster,
                            String banner,
                            Instant createdAt,
                            Instant updatedAt,
                            List<String> categories) {
}
