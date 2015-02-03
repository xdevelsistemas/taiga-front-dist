(function() {
  var promise, version;

  version = 1422967894989;

  window.taigaConfig = {
    "api": "http://taiga.xdevel.com.br/api/v1/",
    "eventsUrl": null,
    "debug": false,
    "publicRegisterEnabled": true,
    "feedbackEnabled": true,
    "privacyPolicyUrl": null,
    "termsOfServiceUrl": null,
    "maxUploadFileSize": null,
    "gitHubClientId": "8faef4f8112b0b832273",
    "contribPlugins": []
  };

  promise = $.getJSON("/js/conf.json");

  promise.done(function(data) {
    return window.taigaConfig = _.extend({}, window.taigaConfig, data);
  });

  promise.always(function() {
    var plugins;
    if (window.taigaConfig.contribPlugins.length > 0) {
      plugins = _.map(window.taigaConfig.contribPlugins, function(plugin) {
        return plugin + "?v=" + version;
      });
      return ljs.load(plugins, function() {
        return ljs.load("/js/app.js?v=" + version, function() {
          return angular.bootstrap(document, ['taiga']);
        });
      });
    } else {
      return ljs.load("/js/app.js?v=" + version, function() {
        return angular.bootstrap(document, ['taiga']);
      });
    }
  });

}).call(this);
