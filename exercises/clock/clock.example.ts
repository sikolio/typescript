const MINUTESPERDAY = 1440
const HOURSPERDAY = 24

class Clock {
  hour: number
  minute: number

  constructor(hour: number = 0, minute: number = 0) {
    this.hour = hour
    this.minute = minute
    this.adjustTime(0)
  }

  private formatNum (num: number): string {
    const numStr = num.toString()
    return numStr.length === 1 ? `0${numStr}` : numStr
  }

  private adjustTime (delta: number): void {
    delta = Math.abs(delta) >= MINUTESPERDAY ? delta % MINUTESPERDAY : delta

    const currentMinutes = this.hour * 60 + this.minute
    let newMinutes = (currentMinutes + delta) % MINUTESPERDAY

    newMinutes = newMinutes < 0 ? newMinutes += MINUTESPERDAY : newMinutes

    this.hour = Math.floor(newMinutes / 60) % HOURSPERDAY
    this.minute = newMinutes - this.hour * 60
  }

  toString() {
    return `${this.formatNum(this.hour)}:${this.formatNum(this.minute)}`
  }

  public plus(minutes: number): Clock {
    this.adjustTime(minutes)
    return this
  }

  public minus(minutes: number): Clock {
    this.adjustTime(-minutes)
    return this
  }

  public equals(otherClock: Clock): boolean {
    return this.hour === otherClock.hour && this.minute === otherClock.minute
  }
}

export default Clock
