export default function ({ app, $axios }) {
    $axios.setBaseURL(app.$config.baseApiUrl);
}
