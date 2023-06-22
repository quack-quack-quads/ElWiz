package dev.quackquackquad.ElWizAuthService.service;

import com.fasterxml.uuid.Generators;

public class UUIDService {
    public static String getUUID() {
        return Generators.timeBasedEpochGenerator().generate().toString();
    }
}
