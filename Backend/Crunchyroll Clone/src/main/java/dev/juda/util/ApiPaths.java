package dev.juda.util;

import java.util.List;

public class ApiPaths {

    public static final String ANIME_POSTERS = "/files/images/animes/posters/";
    public static final String ANIME_BANNERS = "/files/images/animes/banners/";
    public static final String VIDEO_POSTERS = "/files/images/videos/posters/";
    public static final String VIDEO_SOURCES = "/files/videos/srcs/";

    public static final List<String> API_PATHS = List.of(
            ANIME_POSTERS,
            ANIME_BANNERS,
            VIDEO_POSTERS,
            VIDEO_SOURCES
    );

    private ApiPaths(){};
}
