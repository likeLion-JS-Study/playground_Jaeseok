import React, { useState } from 'react';

const Home = () => {
  const [jweet, setJweet] = useState('');
  const onSubmit = (e) => {
    e.preventDefault();
  }
  const onChange = (e) => {
    const { target: { value } } = e;
    setJweet(value);
  }
  return (
    <form onSubmit={onSubmit}>
      <input value={jweet} onChange={onChange} type="text" placeholder="What's on your mind" maxLength={120} />
      <input type="submit" value="Jweet" />
    </form>
  )
};

export default Home;