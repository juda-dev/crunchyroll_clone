package dev.juda.util;

import java.util.List;

public class ApiPaths {

    public static final String ANIME_POSTERS = "/images/animes/posters/";
    public static final String ANIME_BANNERS = "/images/animes/banners/";
    public static final String VIDEO_POSTERS = "/images/videos/posters/";
    public static final String VIDEO_SOURCES = "/videos/srcs/";

    public static final List<String> API_PATHS = List.of(
            ANIME_POSTERS,
            ANIME_BANNERS,
            VIDEO_POSTERS,
            VIDEO_SOURCES
    );

    private ApiPaths(){};
}
