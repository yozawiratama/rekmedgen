# rekmedgen
Health Care Record Generator
---
This is a simple Health care record generator to generate data to support big data research or dummy big data

### How to use?
this generator run with nodejs, so must install nodejs first.
```bash
> npm i
> node ./index.js
```

### Config
```json
{
    "counter": {
        "patient": 100000,
        "doctor": 40,
        "consultationRangeStart": 1,
        "consultationRangeEnd": 15
    }
}
```
`counter.patient` set how much patient
`counter.doctor` set how much doctor
`counter.consultationRangeStart` set how much patient's cosultation range start
`counter.consultationRangeEnd` set how much patient's cosultation range end


### Thanks
