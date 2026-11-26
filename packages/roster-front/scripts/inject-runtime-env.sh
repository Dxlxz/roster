#!/bin/sh

if [ -z "$REACT_APP_SERVER_BASE_URL" ]; then
  echo "Error: REACT_APP_SERVER_BASE_URL is not set."
  exit 1
fi

echo "Injecting runtime environment variables into index.html..."

CONFIG_BLOCK=$(cat << EOF
    <script id="roster-env-config">
      window._env_ = {
        REACT_APP_SERVER_BASE_URL: "$REACT_APP_SERVER_BASE_URL"
      };
    </script>
    <!-- END: roster Config -->
EOF
)
# Use sed to replace the config block in index.html
# Using pattern space to match across multiple lines
echo "$CONFIG_BLOCK" | sed -i.bak '
  /<!-- BEGIN: roster Config -->/,/<!-- END: roster Config -->/{
    /<!-- BEGIN: roster Config -->/!{
      /<!-- END: roster Config -->/!d
    }
    /<!-- BEGIN: roster Config -->/r /dev/stdin
    /<!-- END: roster Config -->/d
  }
' build/index.html
rm -f build/index.html.bak
