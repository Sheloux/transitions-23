import { runSequence } from "./shared/sequenceRunner.js";

const emptySequence = [
    "sketches/v3",
    "sketches/V4",
    "sketches/V5",
    "sketches/V7",
]

const exampleSequence = [
    "sketches/shana-day1",
    "sketches/shana-day2",
    "sketches/shana-day3",
    "sketches/shana-day4"
]

runSequence(exampleSequence)