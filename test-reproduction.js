#!/usr/bin/env node

import { generateApi } from './dist/lib.js';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Test schema similar to the issue report
const testSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Test API for issue reproduction",
    "version": "1.0.0"
  },
  "paths": {
    "/": {
      "get": {
        "operationId": "123getUser",
        "summary": "Gets a leaderboard by its ID",

        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": {
              "type": "integer"
            }
          }
        ],
        "responses": {
          "200": {
            "description": "OK",
            "content": {
              "application/json": {
                "schema": {
                  "type": "object",
                  "properties": {
                    "id": { "type": "integer" },
                    "name": { "type": "string" }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
};

async function reproduce() {
  const tmpDir = await fs.mkdtemp(path.join(os.tmpdir(), 'test-'));
  const schemaPath = path.join(tmpDir, 'schema.json');
  
  await fs.writeFile(schemaPath, JSON.stringify(testSchema, null, 2));
  
  console.log('Generating API from schema...');
  const result = await generateApi({
    input: schemaPath,
    output: tmpDir,
    fileName: 'api',
    silent: true
  });
  
  const generatedContent = await fs.readFile(path.join(tmpDir, 'api.ts'), 'utf8');
  
  console.log('Generated content (relevant parts):');
  console.log('='.repeat(60));
  
  // Find the class definition area with methods
  const classMatch = generatedContent.match(/export class Api[\s\S]*?}$/m);
  if (classMatch) {
    const classContent = classMatch[0];
    console.log(classContent);
  } else {
    console.log('Class not found');
  }
  
  console.log('='.repeat(60));
  
  // Check if syntax is correct
  const hasAssignment = generatedContent.includes('123GetUser" = ');
  const hasColonSyntax = generatedContent.includes('123GetUser": ');
  
  console.log(`Has assignment syntax (=): ${hasAssignment}`);
  console.log(`Has colon syntax (:): ${hasColonSyntax}`);
  
  // Clean up
  await fs.rm(tmpDir, { recursive: true });
}

reproduce().catch(console.error);