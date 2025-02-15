import classes from './ThemedLoader.module.scss'

interface IThemedLoaderProps {}

export const ThemedLoader: React.FC<IThemedLoaderProps> = () => {
  return (
    <>
      <div>Squanching...</div>
      <div className={classes.container}>
        <div className={classes.rickContainer}>
          <div className={classes.headContainer}>
            <div className={classes.head}>
              <div className={classes.browContainer}>
                <div className={classes.brow} />
              </div>
              <div className={classes.eyesContainer}>
                <div className={`${classes.left}, ${classes.eye}`}>
                  <div className={classes.pupil} />
                </div>
                <div className={`${classes.right}, ${classes.eye}`}>
                  <div className={classes.pupil} />
                </div>
              </div>
              <div className={classes.eyebagsContainer}>
                <div className={`${classes.left}, ${classes.eyebag}`} />
                <div className={`${classes.right}, ${classes.eyebag}`} />
              </div>
              <div className={classes.nose} />
              <div className={classes.mouthContainer}>
                <div className={classes.mouth} />
                <div className={classes.spittle} />
                <div className={classes.spittleArcs} />
              </div>
            </div>
            <div className={classes.earContainer}>
              <div className={`${classes.left}, ${classes.ear}`} />
              <div className={`${classes.right}, ${classes.ear}`} />
            </div>
            <div className={classes.hairContainer}>
              <div className={classes.hair} />
            </div>
            <div className={classes.neck} />
          </div>
          <div className={classes.bodyContainer}>
            <div className={classes.body}>
              <div className={classes.shirt}>
                <div className={classes.flapsContainer}>
                  <div className={`${classes.left}, ${classes.flap}`} />
                  <div className={`${classes.right}, ${classes.flap}`} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.mortyContainer}>
          <div className={classes.headContainer}>
            <div className={classes.head}>
              <div className={classes.browsContainer}>
                <div className={`${classes.left}, ${classes.brow}`} />
                <div className={`${classes.right}, ${classes.brow}`} />
              </div>
              <div className={classes.eyesContainer}>
                <div className={`${classes.lef}, ${classes.eye}`}>
                  <div className={classes.pupil} />
                </div>
                <div className={`${classes.right}, ${classes.eye}`}>
                  <div className={classes.pupil} />
                </div>
              </div>
              <div className={classes.nose} />
              <div className={classes.mouthContainer}>
                <div className={classes.mouth} />
              </div>
            </div>
            <div className={classes.earContainer}>
              <div className={`${classes.lef}, ${classes.ear}`} />
              <div className={`${classes.right}, ${classes.ear}`} />
            </div>
            <div className={classes.hairContainer}>
              <div className={classes.hair} />
            </div>
          </div>
          <div className={classes.bodyContainer}>
            <div className={classes.body} />
          </div>
        </div>
      </div>
    </>
  )
}
