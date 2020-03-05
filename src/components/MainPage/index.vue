<template lang="pug">
  .main-page

    template(v-if="gettingLocation && location")
      b Your location: {{ location.latitude }}, {{ location.longitude}}
    template(v-else)
      b {{errorStr}}


    section(v-if="location")
      .wrap(v-for="values in valuesArr")
        template(v-for="(attribute, attributeKey) in values")
          p(v-if="attribute && attributeKey != 'resolvedAddress'")
            | {{columns[attributeKey].name}}:
            |

            template(v-if="attributeKey != 'datetime'")
              b  {{attribute}}
                template(v-if="columns[attributeKey].unit")
                  |
                  | {{columns[attributeKey].unit}}

            template(v-else)
              b  {{attribute | moment("DD/MM/YYYY") }}


    .api-key(v-if="changeKey")
      label(for="api-key") Enter new API KEY from
        a(href="https://www.visualcrossing.com/weather/weather-data-services" target="_blank")
          | https://www.visualcrossing.com/weather/weather-data-services
      input(v-model="API_KEY" id="api-key" type="text")

</template>

<script src="./script.js"></script>
<style src="./style.scss" lang="scss" scoped></style>
