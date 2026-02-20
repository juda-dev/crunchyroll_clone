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
}
