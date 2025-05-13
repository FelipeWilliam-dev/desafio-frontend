import {LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip} from "recharts";

import dayjs from "dayjs";

// dentro do Tooltip formatter
dayjs(timestamp).format("DD/MM/YY - HH:mm:ss");
