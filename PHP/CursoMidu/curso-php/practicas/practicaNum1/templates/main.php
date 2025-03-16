<main>
    <section>
        <img src="<?= $poster_url ?>" width="400" alt="Poster de <?= $title ?>" style="border-radius: 16px;">
    </section>
    <hgroup>
        <h3><?= $data["title"] ?> <?= $until_message ?> </h3>
        <p>Fecha de extreno: <?= $release_date ?> </p>
        <p>La siguiente es: <?= $following_production; ?></p>
    </hgroup>
</main>