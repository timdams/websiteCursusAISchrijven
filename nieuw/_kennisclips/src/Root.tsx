import { Composition, Folder } from "remotion";
import { DUUR as REEL_KENNISCLIPS_DUUR, ReelKennisclips } from "./reels/gevorderden-kennisclips/ReelKennisclips";

// Filmpjes bij de site. Reels staan in "Reels", kennisclips in een Folder per onderdeel.
const STAAND = { fps: 30, width: 1080, height: 1920 };

export const RemotionRoot: React.FC = () => (
  <>
    <Folder name="Reels">
      <Composition id="Reel-kennisclips" component={ReelKennisclips} durationInFrames={REEL_KENNISCLIPS_DUUR} {...STAAND} />
    </Folder>
  </>
);
