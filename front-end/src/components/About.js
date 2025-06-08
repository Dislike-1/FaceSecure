import React from 'react';
import './About.css';
import Navbar from './Navbar';
const About = () => {
  const teamMembers = [
    {
      name: 'Kingshuk Mal',
      image: '/images/kimage.jpg',
      description: 'Lead Developer with a passion for AI and face recognition technologies.',
      instagramUrl: 'https://www.instagram.com/hey_4kash?igsh=MXQ5d3B0dXBmM2pneA==',
    },
    {
      name: 'Nairit Karmakar',
      image: '/images/nimage.png', 
      description: 'UX/UI Designer, focused on creating intuitive user interfaces for real-world applications.',
      instagramUrl: 'https://www.instagram.com/_whimsicalwhisper?igsh=NG00cXQ0OXVneTVl',
    },
  ];

  return (
    <>
      <Navbar/>

    <div className="about-container">
      <h2>About Us</h2>
      <div className="cards-container">
        {teamMembers.map((member, index) => (
          <div className="card" key={index}>
            <img src={member.image} alt={member.name} className="card-image" />
            <div className="card-body">
              <h3 className="card-name">{member.name}</h3>
              <p className="card-description">{member.description}</p>
              <a href={member.instagramUrl} target="_blank" rel="noopener noreferrer" className="card-button">
                View Instagram Profile
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default About;
