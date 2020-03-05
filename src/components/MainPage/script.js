import Vue from "vue";
import axios from "axios";

Vue.use(require("vue-moment"));

export default {
  name: "MainPage",
  data() {
    return {
      API_KEY: "G5KX7ARAW95ZNIPJ1Y2B58HSB",
      locationString: null,
      location: null,
      gettingLocation: false,
      errorStr: null,

      changeKey: false,
      valuesArr: [],
      columns: {}
    };
  },

  created() {
    if (!("geolocation" in navigator)) {
      this.errorStr =
        "Geolocation is not available. Please enable Geolocation on this page!";
      return;
    }

    this.gettingLocation = true;
    navigator.geolocation.getCurrentPosition(
      pos => {
        this.gettingLocation = true;
        this.location = pos.coords;
        this.getWatherData(this.location);
      },
      err => {
        this.gettingLocation = false;
        this.errorStr = err.message;
      }
    );
  },

  mounted() {},

  methods: {
    getWatherData(location) {
      this.locationString = `${location.latitude}, ${location.longitude}`;
      axios
        .get(
          "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/weatherdata/forecast" +
            "?aggregateHours=24" +
            "&shortColumnNames=false" +
            "&sendAsDatasource=false" +
            "&allowAsynch=false" +
            "&contentType=json" +
            "&unitGroup=us" +
            `&key=${this.API_KEY}` +
            `&location=${location.latitude}, ${location.longitude}`
          //   "&locations=Chicago"
        )
        .then(response => {
          this.changeKey = false;
          let data = response.data;
          this.valuesArr = data.locations[this.locationString].values;
          this.columns = data.columns;
        })
        .catch(response => {
          this.changeKey = true;
          console.log(response);
        });
    }
  }
};
