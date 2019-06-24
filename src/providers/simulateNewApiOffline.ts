import {Injectable, Injector} from '@angular/core';
import 'reflect-metadata';
import {DataProvider} from './data';

@Injectable()
/**
 * Returns all data that should
 */
export class SimulateNewApiOffline {

    constructor(private dataProvider: DataProvider) {

    }

    getUserList() {
        return {
            data: [
                {
                    id: 1,
                    name: 'Dardan',
                    surname: 'Iljazi',
                    fingerPrintHash: 'cmFuZG9tX2hhc2g=',
                    role: 'user',
                    subscribed_since: '2019-06-24T07:11:17.000000Z',
                    festival_access: [
                        {
                            id: 1,
                            name: 'Montreux',
                            ishere_changed_at: '2019-06-24T07:11:17.000000Z',
                            ishere: false
                        },
                        {
                            name: 'Paléo',
                            ishere_changed_at: '2019-06-24T09:00:00.000000Z',
                            ishere: true
                        }
                    ],
                    friends: [
                        {
                            id: 3,
                            name: 'Robert',
                            surname: 'De Niro',
                            fingerPrintHash: 'cm9iZXJ0ZGVuaXJv',
                            role: 'user',
                            subscribed_since: '2019-06-24T07:11:17.000000Z',
                            festival_access: [
                                {
                                    name: 'Paléo',
                                    ishere_changed_at: '2019-06-24T07:11:17.000000Z',
                                    ishere: true
                                },
                                {
                                    name: 'Montreux jazz',
                                    ishere_changed_at: '2019-06-24T09:00:00.000000Z',
                                    ishere: false
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }

    getFestivalsList() {
        return {
            data: [
                {

                    festival_access: [
                        {
                            id: 1,
                            name: 'Montreux',
                            date_begin: '2019-06-24T07:11:17.000000Z',
                            date_end: '2019-06-26T07:11:17.000000Z',
                        },
                        {
                            id: 2,
                            name: 'Paléo',
                            date_begin: '2019-06-21T07:11:17.000000Z',
                            date_end: '2019-06-23T07:11:17.000000Z',
                        },
                    ]
                }
            ]
        };
    }

}
