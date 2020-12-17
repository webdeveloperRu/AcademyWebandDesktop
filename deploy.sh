yarn build
rm -f dist/js/*.map
aws s3 cp dist/ s3://app.videocourse.app --recursive