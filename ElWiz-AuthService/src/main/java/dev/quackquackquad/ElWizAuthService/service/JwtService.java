package dev.quackquackquad.ElWizAuthService.service;

import dev.quackquackquad.ElWizAuthService.entity.UserEntity;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.cglib.core.internal.Function;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Service
public class JwtService {
    // TODO - move this to application.properties or env variables
    private static final String SECRET_KEY = "432646294A404E635266556A586E3272357538782F413F442A472D4B61506453";

    public String extractUserEmail(String token) {
        // since we're setting the subject as userEmail
        // checkout generateToken(extraClaims, userDetails) method
        return extractClaim(token, Claims::getSubject);
    }

    // args - (token, function that applies on claims - that extracts a specific
    // claim from the claims)
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        // extract all claims from the token
        final Claims claims = extractAllClaims(token);
        // apply the function that extracts a specific claim from the JWT token to all
        // the claims
        return claimsResolver.apply(claims);
    }

    // ! claims - map of key value pairs - info about user entity
    private Claims extractAllClaims(String token) {
        return Jwts
                .parserBuilder()
                .setSigningKey(getSignInKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public String generateToken(UserDetails userDetails) {
        return generateToken(new HashMap<>(), userDetails);
    }

    // generate token for user with claims
    public String generateToken(
            Map<String, Object> extraClaims,
            UserDetails userDetails) {
        Number maxAge = 1000 * 60  * 60 * 24; // 24 hours
        return Jwts.builder()
                .setClaims(extraClaims)
                .setSubject(userDetails.getUsername())
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + maxAge.longValue()))
                .signWith(getSignInKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String userEmail = extractUserEmail(token);
        return userEmail.equals(userDetails.getUsername()) && !isTokenExpired(token);
    }

    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    private Key getSignInKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}

