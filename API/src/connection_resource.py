import datetime


def get_current_time_formatted() -> str:
    currentDT = datetime.datetime.now()
    hour: str = str(currentDT.hour)
    if len(hour) == 1:
        hour: str = "0" + hour
    minute: str = str(currentDT.minute)
    if len(minute) == 1:
        minute: str = "0" + minute

    return hour + minute


def get_current_date_formatted() -> str:
    currentDT = datetime.datetime.now()
    year: str = str(currentDT.year)
    year = year[2] + year[3]  # only use the decenium numbers
    month: str = str(currentDT.month)
    if len(month) == 1:
        month = "0" + month
    day: str = str(currentDT.day)
    if len(day) == 1:
        day = "0" + day

    return day + month + year


class Timesel:
    DEPARTURE = 1
    ARRIVAL = 2


class TypeOfTransport:
    AUTOMATIC = 1
    TRAINS = 2
    NO_INTERNATIONAL_TRAINS = 3
    ALL = 4


class ConnectionResource:
    def __init__(self, fromStation: str, toStation: str):
        self.m_FromStation: str = fromStation
        self.m_ToStation: str = toStation
        self.m_TimeSel: int = Timesel.DEPARTURE
        self.m_TypeOfTransport: int = TypeOfTransport.AUTOMATIC
        self.m_Alerts: bool = False
        self.m_Results: int = 6
        self.m_Time: str = get_current_time_formatted()
        self.m_Date: str = get_current_date_formatted()
        self.m_ResponseFormat: str = "json"
        self.m_Lang: str = "en"

    def timesel_to_string(self) -> str:
        if self.m_TimeSel == Timesel.DEPARTURE:
            return "departure"
        else:
            return "arrival"

    def type_of_transport_to_string(self) -> str:
        if self.m_TypeOfTransport == TypeOfTransport.AUTOMATIC:
            return "automatic"
        elif self.m_TypeOfTransport == TypeOfTransport.TRAINS:
            return "trains"
        elif self.m_TypeOfTransport == TypeOfTransport.NO_INTERNATIONAL_TRAINS:
            return "nointernationaltrains"
        else:
            return "all"

    def alerts_to_string(self) -> str:
        if self.m_Alerts:
            return "true"
        else:
            return "false"

    def format_uri(self) -> str:
        uri: str = "/connections/?"
        uri += "from=" + self.m_FromStation + "&"
        uri += "to=" + self.m_ToStation + "&"
        uri += "date=" + self.m_Date + "&"
        uri += "time=" + self.m_Time + "&"
        uri += "timesel=" + self.timesel_to_string() + "&"
        uri += "format=" + self.m_ResponseFormat + "&"
        uri += "lang=" + self.m_Lang + "&"
        uri += "typeOfTransport=" + self.type_of_transport_to_string() + "&"
        uri += "alerts=" + self.alerts_to_string() + "&"
        uri += "results=" + str(self.m_Results)

        return uri
