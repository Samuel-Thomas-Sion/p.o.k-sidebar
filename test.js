fetch('https://api.chess.com/pub/club/people-of-kingdom/members')
  .then(r => r.json())
  .then(console.log)
  .catch(console.error);
