
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet'
import './styles.css';
import api from '../../services/api';
import default_avatar from '../../assets/512x512.png'

export default function Portfolio() {
    
    
    // npm run deploy
    //////////////////////////////////////CONFIGURATION: YOU SHOULD EDIT THESE CONSTANT VALUES
    const username = "gustavocioccari";
    const default_name = "Gustavo Belmonte Cioccari"
    const linkedinUrl = "https://www.linkedin.com/in/gustavo-belmonte-cioccari/";
    //////////////////////////////////////CONFIGURATION: YOU SHOULD EDIT THESE CONSTANT VALUES





    const [userData, setUserData] = useState({});
    const [repos, setRepos] = useState({});

    useEffect(() => {
        api.get(`https://api.github.com/users/${username}`).then((githubResponse) => {
            setUserData(githubResponse.data);
            //console.log(githubResponse.data);
        }
        );
        api.get(`https://api.github.com/users/${username}/repos`).then((githubResponse) => {
            setRepos(githubResponse.data);
            //console.log(githubResponse.data);
        }
        );

    }, [])


    var hireable = (<img className="header__wrap__hireble" style={{ "verticalAlign": "middle" }} alt="Available for hire" src="https://img.shields.io/badge/Hireable-Yes-brightgreen"></img>);
    if (userData.hireable !== undefined && !userData.hireable) {
        hireable = (<img className="header__wrap__hireble" alt="Not available for hire" src="https://img.shields.io/badge/Hireable-No-red"></img>);
    }

    var title = "Portfolio";
    if (userData.name !== undefined) {
        title = userData.name + "'s Portfolio";
    }

    var helmetCode = <Helmet></Helmet>;
    if (userData !== undefined) {
        helmetCode =
            <Helmet>
                <title>{title}</title>
                <meta property="og:title" content={`Portfolio by ${userData.name} `} />
                <meta property="og:type" content="profile" />
                <meta property="og:image" content={userData.avatar_url} />
                <meta property="og:url" content={`https://${username}.github.io`} />
                <meta property="og:description" content={userData.bio} />
                <meta property="profile:username" content={username} />
                <meta property="profile:first_name" content="" />
                <meta property="profile:gender" content="" />
                <meta property="profile:last_name" content="" />
                <meta name="description" content="Portfolio by Guilherme" />
            </Helmet>
    }

    return (
        <div>

            {helmetCode}

            <header>
                <div className="header__background uk-background-cover background--image" uk-parallax="bgy: -100"></div>
                <div className="header__wrap">
                    <div className="header__wrap__image">
                        <div className="avatar--image uk-background-cover" >
                            <img src={userData.avatar_url||default_avatar} alt="user_avatar"/>
                        </div>
                    </div>
                    <h1 className="header__wrap__name uk-h1">{userData.name||default_name}</h1>
                    <span className="header__wrap__position">{userData.bio}</span>

                    <div className="header__wrap__social">
                        <a href={linkedinUrl} title="LinkedIn" target="_blank" rel="noopener noreferrer">
                            <span uk-icon="linkedin"></span>
                        </a>
                        <a href={`https://github.com/${username}`} title="GitHub" target="_blank" rel="noopener noreferrer">
                            <span uk-icon="github"></span>
                        </a>
                        {hireable}
                    </div>

                </div>
            </header>

            <main>
                <section className="repositories-section uk-section uk-section-default">
                    <div className="uk-container ">
                        <h2 className="uk-heading-line">
                            <span>
                                <span uk-icon="grid">
                                </span>
                                <span>Repositories</span>
                            </span>
                        </h2>
                        <div className="repositories uk-child-width-1-3@l uk-child-width-1-2@m uk-grid-small " uk-grid="masonry: true" >
                            {generateRepositoriesHtml(repos)}
                        </div>
                    </div>
                </section>
            </main>

            <footer><hr className="uk-divider-icon" /><span>To create your own portifolio folow the instructions on the <a href="https://github.com/guipiveti/guipiveti.github.io/tree/code">code branch  of guipiveti/guipiveti.github.io </a> </span></footer>

        </div>
    );
}


function generateRepositoriesHtml(repositories) {
    var output = [];
    for (var i = 0; i < repositories.length; i++) {
        var try_out = <div></div>;
        if (repositories[i].homepage) {
            try_out =

                <a className="repository__demo" href={repositories[i].homepage} target="_blank" rel="noopener noreferrer">
                    <span uk-icon="play-circle"></span>
                    <span>Try it out</span>
                </a>

        }

        output.push(
            <div key={i}>
                <div className="repository uk-card uk-card-default uk-card-small uk-card-hover"
                    uk-scrollspy="cls: uk-animation-scale-up" >
                    <a href={repositories[i].html_url} target="_blank" rel="noopener noreferrer">
                        <div className="repository__name uk-card-title">{repositories[i].name}</div>
                        <p className="repository__description">{repositories[i].description || '-'}</p>

                    </a>
                    <div className="repository__bottom">
                        <a className="repository__details" href={repositories[i].html_url} target="_blank" rel="noopener noreferrer">
                            <div className="repository__bottom__language">
                                <span uk-icon="code"></span>
                                <span>{repositories[i].language || '-'}</span>
                            </div>
                            <div className="repository__bottom__star">
                                <span uk-icon="star"></span>
                                <span>{repositories[i].stargazers_count}</span>
                            </div>
                            <div className="repository__bottom__forks">
                                <span uk-icon="git-fork"></span>
                                <span>{repositories[i].forks_count}</span>
                            </div>
                        </a>
                        {try_out}
                    </div>


                </div>

            </div>
        );
    }
    return output;
}
