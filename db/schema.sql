CREATE TABLE `autores` (
  `idAutor` INT PRIMARY KEY AUTO_INCREMENT,
  `nome` varchar(120),
  `email` varchar(150) UNIQUE,
  `senhaHash` varchar(255),
  `bio` text,
  -- `foto_url` varchar(255),
  `criado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `atualizado_em` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- CREATE TABLE `posts` (
--   `idPost` int PRIMARY KEY,
--   `titulo` varchar(255),
--   `slug` varchar(255),
--   `conteudo` longtext,
--   `resumo` text,
--   `tempoLeitura` int,
--   `autorId` int,
--   `publicado_em` datetime,
--   `criado_em` datetime,
--   `atualizado_em` datetime,
--   `arquivado_em` datetime,
--   `status` enum(rascunho,publicado)
-- );

-- CREATE TABLE `post_metricas` (
--   `PostId` int PRIMARY KEY,
--   `visualizacoes` int,
--   `compartilhamentos` int,
--   `tempo_medio_leitura` int
-- );

-- CREATE TABLE `posts_relacionados` (
--   `idPostPrincipal` int,
--   `idPostRelacionado` int,
--   PRIMARY KEY (`idPostPrincipal`, `idPostRelacionado`)
-- );

-- CREATE TABLE `categorias` (
--   `idCategoria` int PRIMARY KEY,
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

-- ALTER TABLE `posts` ADD FOREIGN KEY (`autorId`) REFERENCES `autores` (`idAutor`);

-- ALTER TABLE `posts` ADD FOREIGN KEY (`idPost`) REFERENCES `post_metricas` (`PostId`);

-- ALTER TABLE `posts_relacionados` ADD FOREIGN KEY (`idPostPrincipal`) REFERENCES `posts` (`idPost`);

-- ALTER TABLE `posts_relacionados` ADD FOREIGN KEY (`idPostRelacionado`) REFERENCES `posts` (`idPost`);

-- ALTER TABLE `posts_categorias` ADD FOREIGN KEY (`id_categoria`) REFERENCES `categorias` (`idCategoria`);

-- ALTER TABLE `posts_categorias` ADD FOREIGN KEY (`id_post`) REFERENCES `posts` (`idPost`);

-- ALTER TABLE `imagens` ADD FOREIGN KEY (`idPost`) REFERENCES `posts` (`idPost`);
