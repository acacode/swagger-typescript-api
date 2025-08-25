#!/usr/bin/env node

import { generateApi } from './dist/lib.js';
import fs from 'fs/promises';
import path from 'path';
import os from 'os';

// Test schema that should match the issue report more closely
const testSchema = {
  "openapi": "3.0.0",
  "info": {
    "title": "Test API for issue reproduction",
    "version": "1.0.0"
  },
  "paths": {
    "/api/leaderboard/{id}": {
      "get": {
        "operationId": "getLeaderboard",
        "summary": "Gets a leaderboard by its ID",
        "tags": ["Leaderboards"],
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
    silent: true,
    // Try different options to see if any trigger the bug
    extractRequestParams: false,
    modular: false,
    apiClassName: 'Leaderboards',
  });
  
  const generatedContent = await fs.readFile(path.join(tmpDir, 'api.ts'), 'utf8');
  
  console.log('Generated content (relevant parts):');
  console.log('='.repeat(60));
  
  // Find the class definition area with methods
  const classMatch = generatedContent.match(/export class Leaderboards[\s\S]*$/);
  if (classMatch) {
    const classContent = classMatch[0];
    console.log(classContent.substring(0, 1000) + '...'); // Show first 1000 chars
  } else {
    console.log('Leaderboards class not found');
    // Try to find any export class
    const anyClassMatch = generatedContent.match(/export class \w+[^{]*{[\s\S]*?(?=export|$)/);
    if (anyClassMatch) {
      console.log('Found other class:');
      console.log(anyClassMatch[0].substring(0, 500) + '...');
    } else {
      console.log('No export class found');
    }
  }
  
  console.log('='.repeat(60));
  
  // Check if syntax is correct
  const hasAssignment = generatedContent.includes('getLeaderboard = ');
  const hasColonSyntax = generatedContent.includes('getLeaderboard: ');
  
  console.log(`Has assignment syntax (=): ${hasAssignment}`);
  console.log(`Has colon syntax (:): ${hasColonSyntax}`);
  
  // Clean up
  await fs.rm(tmpDir, { recursive: true });
}

reproduce().catch(console.error);