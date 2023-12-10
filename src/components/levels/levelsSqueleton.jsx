export const LevelSqueleton = ({ index }) => {
  let loadingLevelNumber = Math.floor(Math.random() * (7 - 3 + 1)) + 9;
  let loadingLevel = [];

  for (let i = 0; i < loadingLevelNumber; i++) {
    loadingLevel.push(<div key={index + 1 + i} className="leaderboardPlayersListContainer loading">
      <div className="leaderboardPlayer">
        <div className="leaderboardPlayerLeft">
          <div className={(index + i) === 0 ? ("leaderboardRank premier") : ((index + i) === 1 ? ("leaderboardRank second") : ((index + i) === 2 ? ("leaderboardRank troisieme") : ("leaderboardRank")))}>
            {index + i + 1}
          </div>
          <div className="leaderboardPlayerIconLoading">
          </div>
          <div className="leaderboardPlayerUsernameLoading" style={{ width: `${Math.floor(Math.random() * (12 - 6 + 1)) + 6}em` }}>
          </div>
        </div>
        <div className="leaderboardPlayerStats">
          <div className="leaderboardPlayerStatBlock">
            <div className="leaderboardPlayerStatValueLoading">
            </div>
          </div>
          <div className="leaderboardPlayerStatBlock">
            <div className="leaderboardPlayerStatValueLoading">
            </div>
          </div>
          <div className="leaderboardPlayerStat">
            <div className="leaderboardPlayerStatTextLoading" style={{ background: `linear-gradient(90deg, var(--color-principal) 0%, var(--color-principal-hover) 50%, var(--color-principal) 100%)` }} >
            </div>
          </div>
        </div>
      </div>
    </div>)
  }

  return loadingLevel
}

export default LevelSqueleton;