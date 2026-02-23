package dev.juda.controller;

import dev.juda.model.dto.request.SetAnimeRequest;
import dev.juda.model.dto.response.AnimeResponse;
import dev.juda.model.dto.response.MessageResponse;
import dev.juda.model.dto.response.PageResponse;
import dev.juda.service.AnimeService;
import jakarta.validation.Valid;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.UUID;

@RestController
@RequestMapping("/anime")
public class AnimeController {

    private final AnimeService animeService;

    public AnimeController(AnimeService animeService) {
        this.animeService = animeService;
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public MessageResponse createAnime(@Valid @RequestBody SetAnimeRequest request) {
        return animeService.createAnime(request);
    }

    @GetMapping
    @PreAuthorize("hasAnyRole('ADMIN', 'USER')")
    public PageResponse<AnimeResponse> getAllAnimes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String search) {
        return animeService.getAllAnimes(page, size, search);
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public MessageResponse updateAnime(@PathVariable UUID id, @Valid @RequestBody SetAnimeRequest request) {
        return animeService.updateAnime(id, request);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public MessageResponse deleteAnime(@PathVariable UUID id) {
        return animeService.deleteAnime(id);
    }
}
