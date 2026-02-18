package dev.juda.util;

import dev.juda.exception.FileNotFoundException;
import org.springframework.core.io.PathResource;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.core.io.support.ResourceRegion;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public class FileHandlerUtil {
    private FileHandlerUtil() {
    }

    public static String extractFileExtension(String fileName) {
        String fileExtension = "";
        if (fileName != null && fileName.contains(".")) {
            fileExtension = fileName.substring(fileName.lastIndexOf("."));
        }

        return fileExtension;
    }

    public static Path findFileByUUID(Path directory, String uuid) throws Exception {
        return Files.list(directory)
                .filter(path -> path.getFileName().toString().startsWith(uuid))
                .findFirst()
                .orElseThrow(FileNotFoundException::new);
    }

    public static String detectVideoContentType(String fileName) {
        if (fileName == null) return "video/mp4";

        String fileExtension = extractFileExtension(fileName).toLowerCase();

        return switch (fileExtension) {
            case ".webm" -> "video/webm";
            case ".ogg" -> "video/ogg";
            case ".mkv" -> "video/x-matroska";
            case ".avi" -> "video/x-msvideo";
            case ".mov" -> "video/quicktime";
            case ".flv" -> "video/x-flv";
            case ".wmv" -> "video/x-ms-wmv";
            case ".m4v" -> "video/x-m4v";
            case ".3gp" -> "video/3gpp";
            case ".mpg", ".mpeg" -> "video/mpeg";
            default -> "video/mp4";
        };
    }

    public static String detectImageContentType(String fileName) {
        if (fileName == null) return "image/jpeg";

        String fileExtension = extractFileExtension(fileName).toLowerCase();

        return switch (fileExtension) {
            case ".png" -> "image/png";
            case ".gif" -> "image/gif";
            case ".webp" -> "image/webp";
            default -> "image/jpeg";
        };
    }

    public static long[] parseRangeHeader(String rangeHeader, long fileLength) {
        String[] ranges = rangeHeader.replace("bytes=", "").split("-");

        long rangeStart = Long.parseLong(ranges[0]);

        long rangeEnd = ranges.length > 1 && !ranges[1].isEmpty()
                ? Long.parseLong(ranges[1])
                : fileLength - 1;

        return new long[]{rangeStart, rangeEnd};
    }

    public static ResourceRegion createRangeResource(Path filePath, long rangeStart, long rangeLength) {
        Resource fileResource = new PathResource(filePath);

        return new ResourceRegion(fileResource, rangeStart, rangeLength);
    }

    public static Resource createFullResource(Path filePath) throws IOException {
        Resource resource = new UrlResource(filePath.toUri());

        if (!resource.exists() || !resource.isReadable()) throw new FileNotFoundException();

        return resource;
    }
}
