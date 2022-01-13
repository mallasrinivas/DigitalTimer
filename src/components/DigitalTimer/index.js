import './index.css'
import {Component} from 'react'

class DigitalTimer extends Component {
  state = {
    isTimerRunning: false,
    timerCountInMin: 25,
    timerCountInSec: 0,
  }

  componentDidMount() {
    this.clearTimerInterval()
  }

  DecreaseTimeLimit = () => {
    const {timerCountInMin} = this.state
    if (timerCountInMin > 1) {
      this.setState(prevState => ({
        timerCountInMin: prevState.timerCountInMin - 1,
      }))
    }
  }

  IncreaseTimeLimit = () => {
    this.setState(prevState => ({
      timerCountInMin: prevState.timerCountInMin + 1,
    }))
  }

  timerControlsLimit = () => {
    const {timerCountInMin, timerCountInSec} = this.state
    const isButtonsDisabled = timerCountInSec > 0

    return (
      <div className="timer-controls-limit-container">
        <p className="limit-heading">Set Timer limit</p>
        <div className="timer-limit">
          <button
            className="limit-buttons"
            disabled={isButtonsDisabled}
            type="button"
            onClick={this.DecreaseTimeLimit}
          >
            -
          </button>
          <div className="limit-value-container">
            <p className="limit-value">{timerCountInMin}</p>
          </div>
          <button
            className="limit-buttons"
            disabled={isButtonsDisabled}
            type="button"
            onClick={this.IncreaseTimeLimit}
          >
            +
          </button>
        </div>
      </div>
    )
  }

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  onResetTimer = () => {
    this.clearTimerInterval()
    this.setState({
      isTimerRunning: false,
      timerCountInMin: 25,
      timerCountInSec: 0,
    })
  }

  incrementTimerInSeconds = () => {
    const {timerCountInMin, timerCountInSec} = this.state
    const isTimerDone = timerCountInMin * 60 === timerCountInSec
    if (isTimerDone) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(prevState => ({
        timerCountInSec: prevState.timerCountInSec + 1,
      }))
    }
  }

  startOrPauseTimer = () => {
    const {isTimerRunning, timerCountInMin, timerCountInSec} = this.state
    const isTimerDone = timerCountInMin * 60 === timerCountInSec

    if (isTimerDone) {
      this.setState({timerCountInSec: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimerInSeconds, 1000)
    }
    this.setState(prevState => ({
      isTimerRunning: !prevState.isTimerRunning,
    }))
  }

  timerControls = () => {
    const {isTimerRunning} = this.state
    const startPauseImage = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const startPauseText = isTimerRunning ? 'pause icon' : 'play icon'
    return (
      <div className="timer-controller-container">
        <button
          className="timer-controller-button"
          type="button"
          onClick={this.startOrPauseTimer}
        >
          <img
            className="timer-icon"
            src={startPauseImage}
            alt={startPauseText}
          />
          <p className="timer-heading">{isTimerRunning ? 'Pause' : 'Start'}</p>
        </button>
        <button
          className="timer-controller-button"
          type="button"
          onClick={this.onResetTimer}
        >
          <img
            className="timer-icon"
            alt="reset icon"
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
          />
          <p className="timer-heading">Reset</p>
        </button>
      </div>
    )
  }

  getTimeCounter = () => {
    const {timerCountInMin, timerCountInSec} = this.state
    const totalTimeLeft = timerCountInMin * 60 - timerCountInSec
    const minutes = Math.floor(totalTimeLeft / 60)
    const seconds = Math.floor(totalTimeLeft % 60)
    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const timerStatus = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital Timer</h1>
        <div className="digital-container">
          <div className="timer-display-container">
            <div className="timer-container">
              <h1 className="timer-count">{this.getTimeCounter()}</h1>
              <p className="timer-type">{timerStatus}</p>
            </div>
          </div>
          <div className="control-container">
            {this.timerControls()}
            {this.timerControlsLimit()}
          </div>
        </div>
      </div>
    )
  }
}
export default DigitalTimer
