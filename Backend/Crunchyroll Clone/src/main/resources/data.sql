INSERT INTO roles (id, value) VALUES (UNHEX('3485b979f96d10f09121de3e99469514'), 'ADMIN');
INSERT INTO roles (id, value) VALUES (UNHEX('3485be10f96d10f09121de3e99469514'), 'USER');

INSERT INTO categories (id, value) VALUES (UNHEX('f510cdb5bc44b29896f41044f6f89410'), 'Action');
INSERT INTO categories (id, value) VALUES (UNHEX('9b2996f62ced4b5fba56106b3fa264c9'), 'Adventure');
INSERT INTO categories (id, value) VALUES (UNHEX('fb7de9e3e2dc499395105be9f5e9bb46'), 'Comedy');
INSERT INTO categories (id, value) VALUES (UNHEX('72635d1af40c408591aebed698781010'), 'Drama');
INSERT INTO categories (id, value) VALUES (UNHEX('2d84a84e40ed4259b22bfae85f969510'), 'Fantasy');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000001'), 'Music');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000002'), 'Romance');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000003'), 'Sci-Fi');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000004'), 'Seinen');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000005'), 'Shojo');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000006'), 'Shonen');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000007'), 'Slice of Life');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000008'), 'Sports');
INSERT INTO categories (id, value) VALUES (UNHEX('ebcf00cdca1b4396b20c0910bba02010'), 'Supernatural');
INSERT INTO categories (id, value) VALUES (UNHEX('c0000000000000000000000000000009'), 'Thriller');

INSERT INTO animes (id, name, description, banner_uuid, poster_uuid, created_at, updated_at)
VALUES (UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), 'JuDa Dev', 'Juan David Arboleda Vallecilla', '9b6c7883-5952-4b39-aa10-278f8131e341', '540f5f75-eb25-440a-b071-d06c0229091f', '2026-02-27 03:52:19.554398', '2026-03-02 01:47:55.305986');

INSERT INTO anime_categories (anime_id, category_id) VALUES (UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), UNHEX('2d84a84e40ed4259b22bfae85f969510'));
INSERT INTO anime_categories (anime_id, category_id) VALUES (UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), UNHEX('ebcf00cdca1b4396b20c0910bba02010'));
INSERT INTO anime_categories (anime_id, category_id) VALUES (UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), UNHEX('f510cdb5bc44b29896f41044f6f89410'));
INSERT INTO anime_categories (anime_id, category_id) VALUES (UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), UNHEX('fb7de9e3e2dc499395105be9f5e9bb46'));

INSERT INTO users (id, email, password, active, email_verified, role_id, created_at, updated_at, password_reset_token_expiry, password_reset_token, verification_token_expiry, verification_token)
VALUES (UNHEX('10000000000000000000000000000001'), 'arbocilla@mailinator.com', '$2a$10$0XwG3wrjPAORnzr6f3sl5OsUee1rl6EcHy2REt2YaaesNI/WI0ej2', 1, 1, UNHEX('3485be10f96d10f09121de3e99469514'), '2026-03-06 21:06:15.163641', '2026-03-06 21:13:00.538120', NULL, NULL, NULL, NULL);

INSERT INTO users (id, email, password, active, email_verified, role_id, created_at, updated_at, password_reset_token_expiry, password_reset_token, verification_token_expiry, verification_token)
VALUES (UNHEX('2d20a529fe674267a56c2c9eba2dbfbf'), 'judadev@mailinator.com', '$2a$10$3w4Oo744a/8GvlSm1ooRJ.plZtKSF7.rk5m/AjlajTRgndpjMcXk6', 1, 1, UNHEX('3485b979f96d10f09121de3e99469514'), '2026-02-20 13:20:20.075528', '2026-02-20 13:20:42.340731', NULL, NULL, NULL, NULL);

INSERT INTO users (id, email, password, active, email_verified, role_id, created_at, updated_at, password_reset_token_expiry, password_reset_token, verification_token_expiry, verification_token)
VALUES (UNHEX('10000000000000000000000000000003'), 'juanarboleda@mailinator.com', '$2a$10$F.zh6sMCuMviRbuxQg/Pwu7Nh4cQ3BZwNO628XfHsh0YvsnBfaMrW', 1, 1, UNHEX('3485be10f96d10f09121de3e99469514'), '2026-03-04 00:39:25.289977', '2026-03-06 16:55:01.124225', '2026-03-06 17:54:57.775172', '3dece35d-8a41-4367-9028-7eb0ba36e257', NULL, NULL);

INSERT INTO video_metadata (id, title, description, duration, published, anime_id, src_uuid, poster_uuid, created_at, updated_at)
VALUES (UNHEX('728ed5f7205447aaaf46a198fef6fef9'), 'T2 C1 - JuDa aprenderá microservicios', 'The PrisVid', 8, 1, UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), '9a87ea08-8f54-4041-b55e-d8bce9f02e61', '6fb19f77-35b1-4703-b7ad-7d7d9108c831', '2026-03-04 05:22:34.987406', NULL);

INSERT INTO video_metadata (id, title, description, duration, published, anime_id, src_uuid, poster_uuid, created_at, updated_at)
VALUES (UNHEX('20000000000000000000000000000002'), 'T1 C1 - Primera Intro', 'Primera intro de JuDa hecha con Veo 3.1, esa vaina me puso de mujer', 8, 0, UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), '10560e98-998b-4248-9b63-67e0c4d0e8b4', '58105fea-143f-48d5-ba5a-896f9b178b71', '2026-03-01 19:54:55.234856', '2026-03-02 18:14:31.938414');

INSERT INTO video_metadata (id, title, description, duration, published, anime_id, src_uuid, poster_uuid, created_at, updated_at)
VALUES (UNHEX('20000000000000000000000000000003'), 'T3 C1 - JuDa MySQL', 'ArboCilla', 8, 1, UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), 'a9ad932f-bc6d-4d49-89a2-7180741eb003', 'd871da48-742b-4e59-a6df-87a0a7b2b8cc', '2026-03-04 05:23:45.702106', NULL);

INSERT INTO video_metadata (id, title, description, duration, published, anime_id, src_uuid, poster_uuid, created_at, updated_at)
VALUES (UNHEX('20000000000000000000000000000004'), 'T1 C2 - Juan David Arboleda Vallecilla', 'JuDa Dev', 8, 1, UNHEX('2040c6784cc24c8987d7eec23d74a0a3'), '20a0762f-a504-4f2f-87bc-248667a9f1c9', 'f8ed2ef7-dfba-4905-bcfe-5e29a04cadf4', '2026-03-02 16:34:38.652932', NULL);