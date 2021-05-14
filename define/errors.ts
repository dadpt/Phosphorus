
class Errors {
    public ERR_OK         = 0;         /* No error */
    public ERR_CSINUSE    = 1;         /* Callsign in use */
    public ERR_CSINVALID  = 2;         /* Callsign invalid */
    public ERR_REGISTERED = 3;         /* Already registered */
    public ERR_SYNTAX     = 4;         /* Syntax error */
    public ERR_SRCINVALID = 5;         /* Invalid source in packet */
    public ERR_CIDINVALID = 6;         /* Invalid CID/password */
    public ERR_NOSUCHCS   = 7;         /* No such callsign */
    public ERR_NOFP       = 8;         /* No flightplan */
    public ERR_NOWEATHER  = 9;         /* No such weather profile*/
    public ERR_REVISION   = 10;        /* Invalid protocol revision */
    public ERR_LEVEL      = 11;        /* Requested level too high */
    public ERR_SERVFULL   = 12;        /* No more clients */
    public ERR_CSSUSPEND  = 13;        /* CID/PID suspended */
    public errstr = [
        "No error",
        "Callsign in use",
        "Invalid callsign",
        "Already registerd",
        "Syntax error",
        "Invalid source callsign",
        "Invalid CID/password",
        "No such callsign",
        "No flightplan",
        "No such weather profile",
        "Invalid protocol revision",
        "Requested level too high",
        "Too many clients connected",
        "CID/PID was suspended"
    ];
    public getStr(num: number) {
        return this.errstr[num]
    }
}

export default {
    Errors
}