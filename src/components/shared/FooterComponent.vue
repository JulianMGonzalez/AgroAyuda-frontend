<template>
  <v-footer color="secondary text-center white--text">
    <v-container fluid>
        <v-btn
          v-for="(icon, i) in icons"
          :key="i"
          :onclick="icon.onclick"
          target="_blank"
          class="mx-4"
          icon
          color="white"
        >
          <v-icon size="24px">
            {{ icon.p }}
          </v-icon>
        </v-btn>
          <v-row class="py-4">
            <div class="col-lg-5 col-md-12 mb-4 mb-md-0">
              <h5 class="text-uppercase"><b>Agroayuda</b></h5>
              <br />
              <p>
                <font size="4">
                  Nuestro proyecto busca ser un enlace fijo y seguro, el cual
                  sea capaz de suplementar y aliviar todos estos problemas
                  surgentes en nuestro campo. Nuestra principal motivación
                  concierne en la ayudar a nuestros campesinos y sobre todo
                  reflejar su verdadera importancia que debe adquirí en nuestro
                  país</font
                >
              </p>
            </div>
            <div class="col-lg-2 d-flex justify-content-center">
              <v-img
                lazy-src="https://picsum.photos/id/11/10/6"
                src="@/assets/logo footer.png"
                max-height="125"
                max-width="125"
              ></v-img>
            </div>
            <div class="col-lg-5 col-md-12 mb-4 mb-md-0">
              <v-btn
                v-for="(item, i) in links"
                :onclick="item.onclick"
                :key="i"
                color="white"
                text
                rounded
                class="my-2"
              >
                {{ item.p }}
              </v-btn>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d501058.6514427606!2d-75.780221!3d2.074216!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e24fd4a965ba00b%3A0x2acff39e4ee259aa!2sResina%2C%20Guadalupe%2C%20Huila!5e1!3m2!1ses-419!2sco!4v1610416486886!5m2!1ses-419!2sco"
                width="250"
                height="250"
                frameborder="0"
                style="border: 0"
                allowfullscreen=""
                aria-hidden="false"
                tabindex="0"
              ></iframe>
            </div>
          </v-row>
      <v-divider></v-divider>
      <v-card-text>
        {{ new Date().getFullYear() }} — <strong>AgroAyuda</strong><br />
      </v-card-text>
      </v-container>
  </v-footer>
</template>

<script>
export default {
  data: () => ({
    links: [
      {
        p: "inicio",
        onclick: "location.href='#inicio'",
      },
      {
        p: "Teléfono",
        // onclick: "location.href='https://wa.me/573232477487'",
        onclick: "window.open('https://wa.me/573232477487', '_blank')",
      },
      {
        p: "Gmail",
        onclick: "location.href='mailto:tuagroayuda@gmail.com'",
      },
      {
        p: "nuestro Equipo",
        onclick: "location.href='#team'",
      },
      {
        p: "Soporte Técnico",
        onclick: "",
      },
    ],
    icons: [
      {
        p: "mdi-facebook",
        onclick: "window.open('https://www.facebook.com/', '_blank')",
      },
      {
        p: "mdi-instagram",
        onclick: "window.open('https://www.instagram.com/', '_blank')",
      },
      {
        p: "mdi-twitter",
        onclick: "window.open('https://www.twitter.com/', '_blank')",
      },
      {
        p: "mdi-github",
        onclick:
          "window.open('https://github.com/JulianMGonzalez/AgroAyuda-backend', '_blank')",
      },
    ],
  }),
};
</script>