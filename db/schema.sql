-- CREATE TABLE `autores` (
--   `idAutor` INT PRIMARY KEY AUTO_INCREMENT,
--   `nome` varchar(120),
--   `role` ENUM('admin', 'editor', 'autor') DEFAULT 'autor',
--   `email` varchar(150) UNIQUE,
--   `senhaHash` varchar(255),
--   `bio` text,
--   -- `foto_url` varchar(255),
--   `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   `atualizado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
-- );


-- CREATE TABLE `posts` (
--   `idPost` INT PRIMARY KEY AUTO_INCREMENT,
--   `titulo` varchar(255),
--   `slug` varchar(255),
--   `conteudo` longtext,
--   `resumo` text,
--   `tempoLeitura` int,
--   `autorId` int,
--   `publicado_em` TIMESTAMP,
--   `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   `atualizado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
--   `arquivado_em` TIMESTAMP,
--   `status` ENUM('rascunho', 'publicado', 'arquivado') DEFAULT 'rascunho'
-- );

-- CREATE TABLE `post_metricas` (
--   `postId` INT PRIMARY KEY AUTO_INCREMENT,
--   `visualizacoes` INT DEFAULT 0,
--   `compartilhamentos` INT DEFAULT 0,
--   `tempo_medio_leitura` INT DEFAULT 0,
--   FOREIGN KEY (`postId`) REFERENCES `posts` (`idPost`) ON DELETE CASCADE
-- );

-- CREATE TABLE `categorias` (
--   `idCategoria` INT PRIMARY KEY AUTO_INCREMENT,
--   `nome` varchar(100),
--   `slug` varchar(100)
-- );

-- CREATE TABLE `posts_categorias` (
--   `id_post` int,
--   `id_categoria` int,
--   PRIMARY KEY (`id_post`, `id_categoria`)
-- );

-- CREATE TABLE `imagens` (
--   `idImagem` int PRIMARY KEY,
--   `idPost` int,
--   `url` varchar(255),
--   `legenda` varchar(255),
--   `ordem` int,
--   `destaque` bool
-- );

-- CREATE TABLE `posts_relacionados` (
--   `idPostPrincipal` INT,
--   `idPostRelacionado` INT,
--   PRIMARY KEY (`idPostPrincipal`, `idPostRelacionado`)
-- );

-- ALTER TABLE `posts` ADD FOREIGN KEY (`autorId`) REFERENCES `autores` (`idAutor`);

-- ALTER TABLE `posts` ADD FOREIGN KEY (`idPost`) REFERENCES `post_metricas` (`PostId`);

-- ALTER TABLE `posts_relacionados` ADD FOREIGN KEY (`idPostPrincipal`) REFERENCES `posts` (`idPost`);

-- ALTER TABLE `posts_relacionados` ADD FOREIGN KEY (`idPostRelacionado`) REFERENCES `posts` (`idPost`);

-- ALTER TABLE `posts_categorias` ADD FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`idCategoria`);

-- ALTER TABLE `posts_categorias` ADD FOREIGN KEY (`id_post`) REFERENCES `posts` (`idPost`);

-- ALTER TABLE `imagens` ADD FOREIGN KEY (`idPost`) REFERENCES `posts` (`idPost`);
