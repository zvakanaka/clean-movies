Movie server with a clean player on the client.
# Filters
If you have a movie called `Example_Movie.mp4` in your `$VIDEO_PATH` directory, create a filter named `Example_Movie.json` in your `$FILTER_PATH` directory.

Example filter file contents:
```
[
  {  
    start: 123.25,
    end: 124.1
  },
  {  
    start: 135,
    end: 144,
    note: 'A man moons the camera.',
    rating: 'pg-13',
    category: 's'
  }
]
```

You can live-edit filters by adding `&edit` to the URL while watching a movie.

# Environment Variables
Optionally create a file named `.env` for custom environment variables.
```
VIDEO_PATH="/path/to/videos" # default $HOME/Videos
FILTER_PATH="/path/to/filters" # default $VIDEO_PATH/filters
THUMBS_PATH="/path/to/thumbs" # default $VIDEO_PATH/thumbs

PORT=8888
HOST=localhost
```

# Setup
Install dependencies with npm.  
`$ npm install`  
Serve.  
`$ npm start`

# TODO
- [ ] Improve accuracy of clean player (currently within ~300ms)
- [ ] Make filters writable from the client (requires editing file for now)
- [ ] Filter filters with a meta-filter (e.g. only filter PG-13 and above content)
