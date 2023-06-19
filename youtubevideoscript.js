<script src="https://apis.google.com/js/api.js"></script>
  <script>
    function authenticate() {
      return gapi.auth2.getAuthInstance()
        .signIn({ scope: 'https://www.googleapis.com/auth/youtube.readonly' })
        .then(function() { console.log('Sign-in successful'); },
              function(err) { console.error('Error signing in', err); });
    }

    function loadClient() {
      gapi.client.setApiKey('AIzaSyCDdWFSnchcMNyA6dmP7fOaGCa8nt7dHIA');
      return gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest')
        .then(function() { console.log('GAPI client loaded for API'); },
              function(err) { console.error('Error loading GAPI client for API', err); });
    }

    function execute() {
      return gapi.client.youtube.activities.list({
        "part": "snippet,contentDetails",
        "channelId": "UCELOEM89sGzB2YRqbN8-uXg",
        "maxResults": 5
      })
        .then(function(response) {
          var outputDiv = document.getElementById('output');
          response.result.items.forEach(function(item) {
            var videoId = item.contentDetails.upload.videoId;
            var videoTitle = item.snippet.title;
            var videoURL = "https://www.youtube.com/watch?v=" + videoId;
            outputDiv.innerHTML += '<p><a href="' + videoURL + '">' + videoTitle + '</a></p>';
          });
        },
        function(err) { console.error('Error executing API request', err); });
    }

    gapi.load('client:auth2', function() {
      gapi.auth2.init({ client_id: '232304477126-a7731ui1fl2n7au0bbken1kidu21gpd2.apps.googleusercontent.com' });
    });
  </script>
</head>
<body>
  <h1>Recent YouTube Videos</h1>
  <button onclick="authenticate().then(loadClient)">Authorize and Load API</button>
  <button onclick="execute()">Fetch Videos</button>
  <div id="output"></div>
  <script src="https://apis.google.com/js/platform.js?onload=init" async defer></script>
