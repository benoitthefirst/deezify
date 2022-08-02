import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import { nFormatter } from "../utils";
import "./track.scss";

export default function ArtistBanner({ id, name, fans, thumbnail }: any) {
  return (
    <div
      className="artist"
      style={{
        backgroundImage: `url(${thumbnail})`,
      }}
    >
      <div className="artist__header">
        <div className="artist__info">
          <div className="profile__img">
            <img src={thumbnail} alt={name} />
          </div>

          <div className="artist__info__meta">
            <div className="artist__info__type">Artist</div>

            <div className="artist__info__name">{name}</div>

            <div className="artist__info__actions">
              <button className="button-dark">
                <PlayArrowRounded />
                Play
              </button>

              <button className="button-light">Follow</button>
            </div>
          </div>
        </div>

        <div className="artist__listeners">
          <div className="artist__listeners__count">{nFormatter(fans, 1)}</div>

          <div className="artist__listeners__label">Fan Base</div>
        </div>
      </div>
    </div>
  );
}
