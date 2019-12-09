/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */

import {
  AfterContentInit, ChangeDetectorRef, EventEmitter, OnInit
} from '@angular/core';
import {ControlValueAccessor} from '@angular/forms';

import {Observable} from 'rxjs';

import {
  addDays, addMonths, addWeeks, addYears, endOfDay, endOfISOWeek, endOfMonth, endOfWeek, endOfYear,
  format, isAfter, isBefore, isSameDay, parse, setISODay, startOfDay, startOfISOWeek,
  startOfMonth, startOfWeek, startOfYear, subMonths, subWeeks, subYears
} from 'date-fns';

import {AjfCalendarEntrySelectedState} from './calendar-entry-selected-state';
import {AjfCalendarEntry} from './calendar-entry';
import {AjfCalendarPeriodType} from './calendar-period-type';
import {AjfCalendarPeriod} from './calendar-period';
import {AjfCalendarViewMode} from './calendar-view-mode';
import {AjfCalendarWeekDay} from './calendar-week-day';

const weekDays: string[] = [
  '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];

export class AjfCalendarChange {
  source: AjfCalendar;
  period: AjfCalendarPeriod | null;
}

export abstract class AjfCalendar implements AfterContentInit, ControlValueAccessor, OnInit {
  get viewDate(): Date { return this._viewDate; }
  set viewDate(viewDate: Date) {
    this._setViewDate(viewDate);
    this._cdr.markForCheck();
  }

  private _disabled = false;
  get disabled(): boolean { return this._disabled; }
  set disabled(disabled: boolean) {
    const newDisabled = disabled != null && `${disabled}` !== 'false';
    if (newDisabled !== this._disabled) {
      this._disabled = newDisabled;
      this._cdr.markForCheck();
    }
  }

  private _dateOnlyForDay = false;
  get dateOnlyForDay(): boolean { return this._disabled; }
  set dateOnlyForDay(dateOnlyForDay: boolean) {
    this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
    this._cdr.markForCheck();
  }

  private _viewMode: AjfCalendarViewMode = 'month';
  get viewMode(): AjfCalendarViewMode { return this._viewMode; }
  set viewMode(viewMode: AjfCalendarViewMode) {
    this._viewMode = viewMode;
    this._buildCalendar();
    this._cdr.markForCheck();
  }

  private _selectionMode: AjfCalendarPeriodType = 'day';
  get selectionMode(): AjfCalendarPeriodType { return this._selectionMode; }
  set selectionMode(selectionMode: AjfCalendarPeriodType) {
    this._selectionMode = selectionMode;
    this._cdr.markForCheck();
  }

  private _startOfWeekDay = 1;
  get startOfWeekDay(): AjfCalendarWeekDay {
    return <AjfCalendarWeekDay>weekDays[this._startOfWeekDay];
  }
  set startOfWeekDay(weekDay: AjfCalendarWeekDay) {
    this._startOfWeekDay = weekDays.indexOf(weekDay);

    if (this._viewMode === 'month') {
      this._buildCalendar();
    }
    this._cdr.markForCheck();
  }

  private _isoMode: boolean = false;

  get isoMode(): boolean { return this._isoMode; }
  set isoMode(isoMode: boolean) {
    this._isoMode = isoMode;
    this._cdr.markForCheck();
  }

  private _minDate: Date | null;
  get minDate(): Date | null { return this._minDate; }
  set minDate(minDate: Date | null) {
    this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
    this._cdr.markForCheck();
  }

  private _maxDate: Date | null;
  get maxDate(): Date | null { return this._maxDate; }
  set maxDate(maxDate: Date | null) {
    this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
    this._cdr.markForCheck();
  }

  private _change: EventEmitter<AjfCalendarChange> = new EventEmitter<AjfCalendarChange>();
  get change(): Observable<AjfCalendarChange> {
    return this._change.asObservable();
  }

  private _selectedPeriod: AjfCalendarPeriod | null;
  private set selectedPeriod(period: AjfCalendarPeriod | null) {
    this._selectedPeriod = period;
    this._change.emit({
      source: this,
      period: period
    });
    this._refreshSelection();
    this._cdr.markForCheck();
  }

  get value(): AjfCalendarPeriod | Date | null {
    if (this._dateOnlyForDay && this.selectionMode === 'day') {
      return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
    }
    return this._selectedPeriod;
  }
  set value(period: AjfCalendarPeriod | Date | null) {
    if (this._dateOnlyForDay && this.selectionMode === 'day') {
      if (period instanceof Date &&
        (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
        this.selectedPeriod = {
          type: 'day',
          startDate: period,
          endDate: period
        };
        this._onChangeCallback(period);
      }
    } else if (period instanceof Object && period !== this._selectedPeriod) {
      this.selectedPeriod = <AjfCalendarPeriod>period;
      this._onChangeCallback(period);
    }
    this._cdr.markForCheck();
  }

  get calendarRows(): AjfCalendarEntry[][] { return this._calendarRows; }
  get viewHeader(): string { return this._viewHeader; }
  get weekDays(): string[] { return this._weekDays; }

  private _viewDate: Date = new Date();
  private _viewHeader = '';

  private _calendarRows: AjfCalendarEntry[][] = [];
  private _weekDays: string[] = [];

  constructor(private _cdr: ChangeDetectorRef) { }

  prevPage(): void {
    if (this._viewMode == 'month') {
      this.viewDate = subMonths(this.viewDate, 1);
    } else if (this._viewMode == 'year') {
      this.viewDate = subYears(this.viewDate, 1);
    }
    this._buildCalendar();
  }

  nextPage(): void {
    if (this._viewMode == 'month') {
      this.viewDate = addMonths(this.viewDate, 1);
    } else if (this._viewMode == 'year') {
      this.viewDate = addYears(this.viewDate, 1);
    }
    this._buildCalendar();
  }

  previousViewMode(): void {
    if (this._viewMode == 'decade') {
      return;
    } else if (this._viewMode == 'year') {
      this._viewMode = 'decade';
    } else if (this._viewMode == 'month') {
      this._viewMode = 'year';
    }
    this._buildCalendar();
  }

  selectEntry(entry: AjfCalendarEntry): void {
    if (!this._canSelectEntry(entry)) {
      return this._nextViewMode(entry);
    }

    let newPeriod: AjfCalendarPeriod | null = null;
    if (this._isEntrySelected(entry) == 'full') {
      newPeriod = null;
    } else if (this._selectionMode == 'day') {
      newPeriod = {
        type: 'day',
        startDate: entry.date,
        endDate: entry.date
      };
    } else if (this._selectionMode == 'week') {
      newPeriod = {
        type: 'week',
        startDate: this._isoMode ?
          startOfISOWeek(entry.date) :
          startOfWeek(entry.date, {weekStartsOn: this._startOfWeekDay}),
        endDate: this._isoMode ?
          endOfISOWeek(entry.date) :
          endOfWeek(entry.date, {weekStartsOn: this._startOfWeekDay})
      };
    } else if (this._selectionMode == 'month') {
      const monthBounds = this._getMonthStartEnd(entry.date);
      newPeriod = {
        type: 'month',
        startDate: new Date(monthBounds.start),
        endDate: new Date(monthBounds.end)
      };
    } else if (this._selectionMode == 'year') {
      newPeriod = {
        type: 'year',
        startDate: startOfYear(entry.date),
        endDate: endOfYear(entry.date)
      };
    }
    this.value = newPeriod;

    this._onTouchedCallback();
    this._cdr.markForCheck();
  }

  registerOnChange(fn: (value: any) => void) {
    this._onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this._onTouchedCallback = fn;
  }

  writeValue(value: any) {
    if (typeof value === 'string') {
      value = parse(value);
    }
    this.value = value;
  }

  ngOnInit(): void {
    this._buildCalendar();
  }

  ngAfterContentInit(): void {
    this._refreshSelection();
  }

  private _onChangeCallback: (_: any) => void = (_: any) => { };
  private _onTouchedCallback: () => void = () => { };

  private _setViewDate(date: Date): void {
    this._viewDate = date;
  }

  private _getMonthStartEnd(date: Date): { start: Date, end: Date } {
    if (!this._isoMode) {
      return {
        start: startOfMonth(date),
        end: endOfMonth(date),
      };
    }
    let startDate = startOfMonth(endOfISOWeek(date));
    let endDate = endOfMonth(startDate);
    const startWeekDay = startDate.getDay();
    const endWeekDay = endDate.getDay();
    if (startWeekDay == 0 || startWeekDay > 4) {
      startDate = addWeeks(startDate, 1);
    }
    if (endWeekDay > 0 && endWeekDay < 4) {
      endDate = subWeeks(endDate, 1);
    }
    startDate = startOfISOWeek(startDate);
    endDate = endOfISOWeek(endDate);
    return { start: startDate, end: endDate };
  }

  private _buildCalendar(): void {
    if (this._viewMode == 'month') {
      this._buildMonthView();
    } else if (this._viewMode == 'year') {
      this._buildYearView();
    } else if (this._viewMode == 'decade') {
      this._buildDecadeView();
    }
    this._cdr.markForCheck();
  }

  private _buildDecadeView(): void {
    let curYear: number = this._viewDate.getFullYear();
    let firstYear = curYear - (curYear % 10) + 1;
    let lastYear = firstYear + 11;

    this._viewHeader = `${firstYear} - ${lastYear}`;

    let curDate: Date = startOfYear(this._viewDate);
    curDate.setFullYear(firstYear);

    let rows: AjfCalendarEntry[][] = [];
    for (let i = 0; i < 4; i++) {
      let row: AjfCalendarEntry[] = [];
      for (let j = 0; j < 3; j++) {
        let date = new Date(curDate);
        let newEntry = new AjfCalendarEntry({
          type: 'year',
          date: date,
          selected: 'none'
        });
        newEntry.selected = this._isEntrySelected(newEntry);
        row.push(newEntry);
        curDate = addYears(curDate, 1);
      }
      rows.push(row);
    }
    this._calendarRows = rows;
  }

  private _buildYearView(): void {
    this._viewHeader = `${this._viewDate.getFullYear()}`;

    let curDate: Date = startOfYear(this._viewDate);

    let rows: AjfCalendarEntry[][] = [];
    for (let i = 0; i < 4; i++) {
      let row: AjfCalendarEntry[] = [];
      for (let j = 0; j < 3; j++) {
        let date = new Date(curDate);
        let newEntry = new AjfCalendarEntry({
          type: 'month',
          date: date,
          selected: 'none'
        });
        newEntry.selected = this._isEntrySelected(newEntry);
        row.push(newEntry);
        curDate = addMonths(curDate, 1);
      }
      rows.push(row);
    }
    this._calendarRows = rows;
  }

  private _buildMonthView(): void {
    this._viewHeader = format(this._viewDate, 'MMM YYYY');

    this._buildMonthViewWeekDays();
    const monthDay = new Date(this._viewDate.getFullYear(), this._viewDate.getMonth(), 5);
    const monthBounds = this._getMonthStartEnd(monthDay);
    let viewStartDate: Date = new Date(monthBounds.start);
    let viewEndDate: Date = new Date(monthBounds.end);
    if (!this._isoMode) {
      viewStartDate = startOfWeek(viewStartDate);
      viewEndDate = endOfWeek(viewEndDate);
    }

    let rows: AjfCalendarEntry[][] = [];
    let todayDate = new Date();
    let curDate = new Date(viewStartDate);
    let minDate = this.minDate == null ? null : new Date(this.minDate);
    let maxDate = this.maxDate == null ? null : new Date(this.maxDate);
    while (curDate < viewEndDate) {
      let row: AjfCalendarEntry[] = [];
      for (let i = 0; i < 7; i++) {
        let disabled = (minDate != null && isBefore(curDate, minDate)) ||
          (maxDate != null && isAfter(curDate, maxDate));
        let date = new Date(curDate);
        let newEntry: AjfCalendarEntry = new AjfCalendarEntry({
          type: 'day',
          date: date,
          selected: 'none',
          highlight: format(todayDate, 'YYYY-MM-DD') === format(curDate, 'YYYY-MM-DD'),
          disabled: disabled
        });
        newEntry.selected = this._isEntrySelected(newEntry);
        row.push(newEntry);
        curDate = addDays(curDate, 1);
      }
      rows.push(row);
    }

    this._calendarRows = rows;
  }

  private _buildMonthViewWeekDays(): void {
    let curDate: Date;
    if (this._isoMode) {
      curDate = setISODay(startOfWeek(this._viewDate), 1);
    } else {
      curDate = startOfWeek(this._viewDate);
    }
    let weekDayNames: string[] = [];
    for (let i = 0; i < 7; i++) {
      weekDayNames.push(format(curDate, 'dddd'));
      curDate = addDays(curDate, 1);
    }
    this._weekDays = weekDayNames;
    this._cdr.markForCheck();
  }

  private _periodOrder(entryType: AjfCalendarPeriodType): number {
    return ['day', 'week', 'month', 'year'].indexOf(entryType);
  }

  private _isEntrySelected(entry: AjfCalendarEntry): AjfCalendarEntrySelectedState {
    if (
      this._selectedPeriod != null && this._selectedPeriod.startDate != null &&
      this._selectedPeriod.endDate != null
    ) {
      let selectionStart: Date = startOfDay(this._selectedPeriod.startDate);
      let selectionEnd: Date = endOfDay(this._selectedPeriod.endDate);
      let selectionPeriodOrder: number = this._periodOrder(this._selectedPeriod.type);

      let entryPeriodOrder: number = this._periodOrder(entry.type);
      let entryRange: { start: Date, end: Date } = entry.getRange();

      if (entryPeriodOrder <= selectionPeriodOrder &&
        this._isBetween(entryRange.start, selectionStart, selectionEnd) &&
        this._isBetween(entryRange.end, selectionStart, selectionEnd)
      ) {
        return 'full';
      } else if (entryPeriodOrder > selectionPeriodOrder &&
        this._isBetween(selectionStart, entryRange.start, entryRange.end) &&
        this._isBetween(selectionEnd, entryRange.start, entryRange.end)
      ) {
        return 'partial';
      }
    }

    return 'none';
  }

  private _isBetween(date: Date, rangeLeft: Date, rangeRight: Date): boolean {
    return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft))
      && (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
  }

  private _refreshSelection(): void {
    for (let row of this._calendarRows) {
      for (let entry of row) {
        entry.selected = this._isEntrySelected(entry);
      }
    }
  }

  private _canSelectEntry(entry: AjfCalendarEntry): boolean {
    if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
      return false;
    }
    if (this._selectionMode == 'month' && entry.type == 'year') {
      return false;
    }
    return true;
  }

  private _nextViewMode(entry: AjfCalendarEntry): void {
    if (this._viewMode == 'decade') {
      this._viewMode = 'year';
    } else if (this._viewMode == 'year') {
      this._viewMode = 'month';
    } else if (this._viewMode == 'month') {
      return;
    }
    this._viewDate = entry.date;
    this._buildCalendar();
  }
}
