/*
 * Copyright (c) 2024 Payhuddle. All rights reserved.
 *
 * This software and associated documentation files are the intellectual
 * property of Payhuddle. Use of this software is governed by the terms
 * of the applicable license agreement.
 *
 * No part of this software may be reproduced, distributed, or transmitted
 * in any form or by any means without the prior written permission of Payhuddle.
 */
export interface RadioGroupProps {
  options: Array<{ value: string; label: string; icon?: React.ReactNode }>;
  defaultValue?: string;
  value?: any;
  onChange?: (e: any) => void;
  disabled?: boolean;
  name?: string;
}
