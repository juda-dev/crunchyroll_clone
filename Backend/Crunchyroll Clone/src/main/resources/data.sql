INSERT INTO roles (id, value) VALUES (UNHEX(REPLACE('3485b979f96d10f09121de3e99469514', '-', '')), 'ADMIN');
INSERT INTO roles (id, value) VALUES (UNHEX(REPLACE('3485be10f96d10f09121de3e99469514', '-', '')), 'USER');

INSERT INTO categories (id, value) VALUES (UNHEX(REPLACE('f510cdb5bc44b29896f41044f6f89410', '-', '')), 'Action');
INSERT INTO categories (id, value) VALUES (UNHEX(REPLACE('9b2996f62ced4b5fba56106b3fa264c9', '-', '')), 'Adventure');
INSERT INTO categories (id, value) VALUES (UNHEX(REPLACE('fb7de9e3e2dc499395105be9f5e9bb46', '-', '')), 'Comedy');
INSERT INTO categories (id, value) VALUES (UNHEX(REPLACE('72635d1af40c408591aebed698781010', '-', '')), 'Drama');
INSERT INTO categories (id, value) VALUES (UNHEX(REPLACE('2d84a84e40ed4259b22bfae85f969510', '-', '')), 'Fantasy');
INSERT INTO categories (id, value) VALUES (UNHEX(REPLACE('ebcf00cdca1b4396b20c0910bba02010', '-', '')), 'Supernatural');

INSERT INTO animes (id, name, description, banner_uuid, poster_uuid, created_at, updated_at)
VALUES (UNHEX(REPLACE('2040c6784cc24c8987d7eec23d74a0a3', '-', '')), 'JuDa Dev', 'Juan David Arboleda Vallecilla', '9b6c7883-5952-4b39-aa10-278f8131e341', '540f5f75-eb25-440a-b071-d06c0229091f', '2026-02-27 03:52:19.554398', '2026-03-02 01:47:55.305986');

-- Relación Anime-Categorías
INSERT INTO anime_categories (anime_id, category_id) VALUES (UNHEX(REPLACE('2040c6784cc24c8987d7eec23d74a0a3', '-', '')), UNHEX(REPLACE('2d84a84e40ed4259b22bfae85f969510', '-', '')));
INSERT INTO anime_categories (anime_id, category_id) VALUES (UNHEX(REPLACE('2040c6784cc24c8987d7eec23d74a0a3', '-', '')), UNHEX(REPLACE('ebcf00cdca1b4396b20c0910bba02010', '-', '')));

INSERT INTO users (id, email, password, active, email_verified, role_id, created_at, updated_at)
VALUES (UNHEX(REPLACE('2d20a529fe674267a56c2c9eba2dbfbf', '-', '')), 'judadev@mailinator.com', '$2a$10$3w4Oo744a/8GvlSm1ooRJ.plZtKSF7.rk5m/AjlajTRgndpjMcXk6', 1, 1, UNHEX(REPLACE('3485b979f96d10f09121de3e99469514', '-', '')), '2026-02-20 13:20:20.075528', '2026-02-20 13:20:42.340731');

INSERT INTO video_metadata (id, title, description, duration, published, anime_id, src_uuid, poster_uuid, created_at)
VALUES (UNHEX(REPLACE('728ed5f7205447aaaf46a198fef6fef9', '-', '')), 'T2 C1 - JuDa aprenderá microservicios', 'The PrisVid', 8, 1, UNHEX(REPLACE('2040c6784cc24c8987d7eec23d74a0a3', '-', '')), '9a87ea08-8f54-4041-b55e-d8bce9f02e61', '6fb19f77-35b1-4703-b7ad-7d7d9108c831', '2026-03-04 05:22:34.987406');
