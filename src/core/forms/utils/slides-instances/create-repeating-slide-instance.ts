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

import {AjfRepeatingSlideInstance} from '../../interface/slides-instances/repeating-slide-instance';
import {AjfSlideInstanceCreate, createSlideInstance} from './create-slide-instance';

export type AjfRepeatingSlideInstanceCreate = Omit<AjfSlideInstanceCreate, 'node'>&
    Pick<AjfRepeatingSlideInstance, 'node'>&Partial<AjfRepeatingSlideInstance>;

export function createRepeatingSlideInstance(instance: AjfRepeatingSlideInstanceCreate):
    AjfRepeatingSlideInstance {
  const slideInstance = createSlideInstance(instance);
  return {
    ...slideInstance,
    node: instance.node,
    slideNodes: [],
    formulaReps: instance.formulaReps,
    reps: 0,
    nodes: [],
    flatNodes: [],
  };
}