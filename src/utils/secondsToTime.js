export default seconds =>
    new Date(seconds * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)[0];
