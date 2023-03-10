import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import useAxiosTMDB from "../Hooks/useAxiosTMDB";
import "./TrendingTV.css";


const TrendingTV = ({ timeFrame, tvCount }) => {
    const { response, loading, error } = useAxiosTMDB({
        method: 'get',
        url: `trending/tv/${timeFrame}`,
        sortByPopularity: true,
        responseLength: tvCount,
    });

    // Base URL that needs to be pre-pended to 'poster_path'
    const prePosterPath = "https://image.tmdb.org/t/p/original";

    // Disclaimer that needs to be included when using TMDB API data
    const disclaimer = "This product uses the TMDB API but is not endorsed or certified by TMDB.";

    const renderSliderList = (trendingObj) => {
        if (!loading) {
            return (
                <div className="horizontalScroll">
                    {trendingObj.map(tvshow => (
                        <div className="bookDiv">
                            <div className="tvPosterDiv">
                                <Link to={`/secondary-tv-page/${tvshow['id']}`} state={{ tvDetails: { tvshow } } }>
                                    {<img src={`${prePosterPath}${tvshow['poster_path']}`} height="255" width="155" />}
                                </Link>
                            </div>
                        </div>
                    ))}
                    <p className="disclaimerTMDB">{disclaimer}</p>
                </div>
            );
        }
    };

    useEffect(() => {
    }, [loading, error]);

    return (
        <>
            <div className="trendingTVDiv">
                <h3>TV Trending Today</h3>
                {renderSliderList(response)}
            </div>
        </>
    );

};

export default TrendingTV;
