import React from 'react';
import { withRouter } from 'react-router-dom';

function Home(props) {

    return (
        <div className="mt-2">
            <h1>Welcome to Oinognostis</h1>
            <p>
                Discover the rich world of wines! From deep reds to crisp whites, wines offer a unique taste experience that can enhance any meal or occasion.
                Whether you're a connoisseur or just beginning your journey, there's a bottle out there for everyone. Explore different varieties, learn about
                the winemaking process, and find your perfect pour.
            </p>
            <p>
                Join us as we celebrate the art of winemaking and the joy it brings to our lives. Cheers to new discoveries and memorable moments!
            </p>
        </div>
    );
}

export default withRouter(Home);