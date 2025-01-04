"use client";

import { Box, HStack, Text, Select, Input } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AccountableContext } from "@/providers/ContextProvider";
import { DateTime } from "luxon";

export default function RangeSelector() {
  const context = useContext(AccountableContext);
  const [fromMonth, setFromMonth] = useState<number>(DateTime.now().month);
  const [fromYear, setFromYear] = useState<number>(DateTime.now().year);
  const [dateRange, setDateRange] = useState<string>("1");

  const computeDateRange = () => {
    // Variables
    let day = 0;
    let curStart;

    // Dates ranges
    const dateRangeNumber = parseInt(dateRange);

    // Dates computation
    const curDate = DateTime.now();
    let curEnd = DateTime.fromObject({
      year: fromYear,
      month: fromMonth,
    });

    if (fromMonth === curDate.month && fromYear === curDate.year) {
      day = curDate.day;
    } else {
      day = curEnd.daysInMonth || 1;
    }

    curEnd = DateTime.fromObject({
      year: curEnd.year,
      month: curEnd.month,
      day: day,
    });

    if (
      dateRangeNumber === 1 &&
      fromMonth === curDate.month &&
      fromYear === curDate.year
    ) {
      curStart = DateTime.fromObject({
        year: curDate.year,
        month: curDate.month,
        day: 1,
      });
    } else if (dateRangeNumber === 1) {
      curStart = DateTime.fromObject({
        year: curEnd.year,
        month: curEnd.month,
        day: 1,
      });
    } else {
      curStart = curEnd.minus({ months: dateRangeNumber });
      curStart = DateTime.fromObject({
        year: curStart.year,
        month: curStart.month,
        day: 1,
      });
    }

    // History dates
    const hisEnd = curEnd.minus({ months: dateRangeNumber });
    const hisStart = curStart.minus({ months: dateRangeNumber });

    context.setters.computedDateRange({
      range: dateRangeNumber,
      curStart,
      curEnd,
      hisStart,
      hisEnd,
    });
  };

  useEffect(() => {
    const currMonth = context.states.computedDateRange.curStart.month;
    const currYear = context.states.computedDateRange.curStart.year;
    const currRange = context.states.computedDateRange.range;

    if (
      fromMonth !== currMonth ||
      fromYear !== currYear ||
      parseInt(dateRange) !== currRange
    ) {
      computeDateRange();
    }
  }, [fromMonth, fromYear, dateRange]);

  return (
    <Box w={"100%"}>
      <Text fontSize={"sm"}>Start</Text>
      <HStack>
        <Select
          w={"60%"}
          size={"sm"}
          value={fromMonth}
          onChange={(e) => setFromMonth(parseInt(e.target.value))}
        >
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </Select>
        <Input
          w={"40%"}
          type="number"
          value={fromYear}
          size={"sm"}
          onChange={(e) => setFromYear(parseInt(e.target.value))}
        />
      </HStack>
      <Text fontSize={"sm"}>history of</Text>
      <Select
        w={"100%"}
        size={"sm"}
        value={dateRange}
        onChange={(e) => setDateRange(e.target.value)}
      >
        <option value={"1"}>1 month</option>
        <option value={"2"}>2 months</option>
        <option value={"3"}>3 months</option>
        <option value={"4"}>4 months</option>
        <option value={"5"}>5 months</option>
        <option value={"6"}>6 months</option>
      </Select>
    </Box>
  );
}
