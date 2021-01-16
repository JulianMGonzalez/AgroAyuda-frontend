<template>
    <v-footer v-bind="localAttrs" :padless="padless" class="mt-10">
      <v-card
        max-height="2400"
        max-width="2400"
        flat
        tile
        class="text-center"
        color="#5e2129"
      >
        <v-card-text>
          <v-btn
            v-for="(icon, i) in icons"
            :key="i"
            :onclick="icon.onclick"
            target="_blank"
            class="mx-4 white--text"
            icon
            color="white"
          >
            <v-icon size="24px">
              {{ icon.p }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text class="white--text pt-0">
          <div>
            <!--Grid row-->
            <div class="row">
              <!--Grid column-->
              <div class="col-lg-5 col-md-12 mb-4 mb-md-0">
                <h5 class="text-uppercase"><b>Agroayuda</b></h5>

                <br />
                <p>
                  <font size="4">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Cumque eum veritatis debitis sit, recusandae modi! Obcaecati
                    praesentium eaque qui sapiente exercitationem, eligendi
                    ipsum, perspiciatis delectus adipisci, ducimus ratione
                    consequuntur voluptatum.</font
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
                  width="300"
                  height="300"
                  frameborder="0"
                  style="border: 0"
                  allowfullscreen=""
                  aria-hidden="false"
                  tabindex="0"
                ></iframe>
                <!-- <h5 class="text-uppercase"><b>CONTACTOS</b></h5>
                  <br>
                  <p>
                    <font size=4> 
                      <ul><li><a href="mailto:tuagroayuda@gmail.com">Gmail</a></li></ul>
                     </font>
                  </p> -->
              </div>
            </div>
            <!--Grid row-->
          </div>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-text class="white--text">
          {{ new Date().getFullYear() }} — <strong>AgroAyuda</strong><br />
        </v-card-text>
      </v-card>
    </v-footer>
</template>

<script>
export default {
    data:() => ({
        padless: false,
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
        onclick: "",
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
          "window.open('https://github.com/julca02/backendagroayuda', '_blank')",
      },
    ],
    }),
    computed: {
    localAttrs() {
      const attrs = {};

      if (this.variant === "default") {
        attrs.absolute = false;
        attrs.fixed = false;
      } else {
        attrs[this.variant] = true;
      }
      return attrs;
    },
  },
}
</script>